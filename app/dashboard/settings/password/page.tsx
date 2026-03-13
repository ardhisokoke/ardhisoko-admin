"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardHeader } from "@/components/ui/Card";
import { FormField, Input } from "@/components/ui/FormField";

function getStrength(pw: string): { width: string; color: string; label: string } {
  if (!pw) return { width: "0%", color: "#E0E0E0", label: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { width: "25%", color: "#E53935", label: "Weak" };
  if (score <= 2) return { width: "50%", color: "#F5921E", label: "Fair" };
  if (score <= 3) return { width: "75%", color: "#FDD835", label: "Good" };
  return { width: "100%", color: "#43A047", label: "Strong" };
}

export default function PasswordPage() {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");

  const strength = getStrength(newPw);

  async function handleSubmit() {
    if (!current || !newPw || !confirm) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPw !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPw.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: current, newPassword: newPw }),
    });

    if (res.ok) {
      toast.success("Password changed successfully");
      setCurrent("");
      setNewPw("");
      setConfirm("");
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to change password");
    }
  }

  return (
    <div className="max-w-[480px]">
      <Card>
        <CardHeader title="🔒 Change Password" />
        <p className="text-[0.84rem] text-[#666] mb-5 leading-relaxed">
          Update your admin dashboard password. Choose a strong password of at least 8 characters.
        </p>

        <FormField label="Current Password">
          <Input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Enter current password"
          />
        </FormField>

        <FormField label="New Password">
          <Input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            placeholder="Enter new password"
          />
          {newPw && (
            <>
              <div className="h-[5px] rounded-full mt-2 bg-[#E0E0E0] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: strength.width, background: strength.color }}
                />
              </div>
              <p className="text-[0.68rem] mt-1 font-semibold" style={{ color: strength.color }}>
                {strength.label}
              </p>
            </>
          )}
        </FormField>

        <FormField label="Confirm New Password">
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat new password"
          />
          {confirm && newPw !== confirm && (
            <p className="text-[0.68rem] text-[#E53935] mt-1">Passwords do not match</p>
          )}
        </FormField>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#F5921E] hover:bg-[#D97A10] text-white py-3 rounded font-montserrat text-[0.86rem] font-bold tracking-wide uppercase transition-colors mt-2"
        >
          Update Password
        </button>

        <div className="mt-4 bg-[#FFF3E0] border border-[#F5921E]/30 rounded-md p-3">
          <p className="font-montserrat text-[0.68rem] font-bold text-[#F5921E] uppercase tracking-wide mb-1">
            ⚠️ Important
          </p>
          <p className="text-[0.72rem] text-[#666] leading-relaxed">
            Password changes are stored in your environment variables. Update{" "}
            <code className="bg-[#F5F5F5] px-1 py-0.5 rounded text-[0.68rem]">ADMIN_PASSWORD_HASH</code>{" "}
            in your <code className="bg-[#F5F5F5] px-1 py-0.5 rounded text-[0.68rem]">.env</code> file for production deployments.
          </p>
        </div>
      </Card>
    </div>
  );
}
