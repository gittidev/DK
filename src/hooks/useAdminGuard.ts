import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export const useAdminGuard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async (session: Session | null) => {
      if (!session?.user) {
        setIsAdmin(false);
        setLoading(false);
        navigate("/admin/login");
        return;
      }

      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id);

      if (error) {
        console.error("Error fetching profile:", error);
        setIsAdmin(false);
        setLoading(false);
        navigate("/admin/login");
        return;
      }

      const profile = profiles?.[0];

      if (profile?.is_admin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        alert("관리자 권한이 없습니다.");
        navigate("/admin/login");
      }
      setLoading(false);
    };

    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        checkAdminStatus(session);
      } else {
        setLoading(false);
        navigate("/admin/login");
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          checkAdminStatus(session);
        } else if (event === "SIGNED_OUT") {
          setIsAdmin(false);
          navigate("/admin/login");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  return { isAdmin, loading };
};
