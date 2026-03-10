"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleEnter = () => {
    if (!username.trim()) return;
    sessionStorage.setItem("username", username.trim());
    router.push("/feed");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DDDDDD] px-4">
      <Dialog open modal>
        <DialogContent
          showCloseButton={false}
          className="gap-0 overflow-hidden p-0 sm:max-w-sm"
        >
          <div className="px-6 py-5">
            <DialogTitle className="text-lg font-bold">
              Welcome to CodeLeap network!
            </DialogTitle>
          </div>
          <div className="flex flex-col gap-4 px-6 pb-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username">
                Please enter your username
              </Label>
              <Input
                id="username"
                placeholder="John doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                autoFocus
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleEnter} disabled={!username.trim()}>
                ENTER
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
