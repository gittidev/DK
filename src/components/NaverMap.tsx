import styles from "./NaverMap.module.scss";
import { useRef, useEffect, useState } from "react";
import logoSvg from "../assets/logo_line_white.svg?raw";
import { supabase } from "../utils/supabaseClient";
import type { LocationData } from "../types/project";

const resizedLogoSvg = logoSvg.replace(
  "<svg",
  '<svg width="24" height="24" style="display:inline-block; vertical-align:middle;"'
);

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [locations, setLocations] = useState<LocationData[]>([]);

  const geocodeAddress = (
    address: string
  ): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (
        !window.naver ||
        !window.naver.maps ||
        typeof window.naver.maps.Service.geocode !== "function"
      ) {
        console.error("Naver geocoder not available");
        resolve(null);
        return;
      }

      window.naver.maps.Service.geocode(
        { query: address },
        // @ts-expect-error any type
        (status: string, response) => {
          if (
            status !== window.naver.maps.Service.Status.OK ||
            !response.v2.addresses.length
          ) {
            console.error("Geocoding failed for:", address);
            resolve(null);
            return;
          }

          const result = response.v2.addresses[0];
          resolve({ lat: Number(result.y), lng: Number(result.x) });
        }
      );
    });
  };

  useEffect(() => {
    const loadAndCacheLocations = async () => {
      const cached = sessionStorage.getItem("geocodedLocations");
      if (cached) {
        setLocations(JSON.parse(cached));
        return;
      }

      const { data, error } = await supabase
        .from("project_locations")
        .select("*");
      if (error || !data) {
        console.error("Supabase fetch error:", error);
        return;
      }

      const geocoded: LocationData[] = [];

      for (const loc of data) {
        if (loc.latitude && loc.longitude) {
          geocoded.push(loc); // 이미 좌표가 있는 경우
        } else {
          const coords = await geocodeAddress(loc.address);
          if (coords) {
            geocoded.push({
              ...loc,
              latitude: coords.lat,
              longitude: coords.lng,
            });
          }
        }
      }

      setLocations(geocoded);
      sessionStorage.setItem("geocodedLocations", JSON.stringify(geocoded));
    };

    loadAndCacheLocations();
  }, []);

  useEffect(() => {
    if (!window.naver || locations.length === 0) return;

    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(35.1736, 126.8107),
      zoom: 10,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    });

    locations.forEach((loc) => {
      if (loc.latitude && loc.longitude) {
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(loc.latitude, loc.longitude),
          map,
          icon: {
            content: `
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                background: #2563eb; /* 파란색 */
                color: white;
                font-size: 10px;
                font-weight: 600;
                padding: 6px 10px;
                border-radius: 20px;
                position: relative;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                white-space: nowrap;
              ">
                📍 ${loc.description || "시공지"}
                <div style="
                  position: absolute;
                  bottom: -6px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 0;
                  height: 0;
                  border-left: 6px solid transparent;
                  border-right: 6px solid transparent;
                  border-top: 6px solid #2563eb;
                "></div>
              </div>
            `,
            anchor: new window.naver.maps.Point(20, 40),
          },
          title: loc.address,
        });
      }
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(35.1736, 126.8107),
      map,
      title: "대광PC 사무실",
      icon: {
        content: `
          <div style="
            background: #1E90FF;
            color: white;
            padding: 6px 10px;
            border-radius: 12px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          ">
            ${resizedLogoSvg}
            <span>대광PC</span>
          </div>
        `,
        anchor: new window.naver.maps.Point(20, 40),
      },
    });
  }, [locations]);

  return (
    <>
      <div id="map" ref={mapRef} className={styles.map} />
    </>
  );
};

export default NaverMap;
