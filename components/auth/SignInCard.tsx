"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInValues = z.infer<typeof signInSchema>;

const SignInCard = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: SignInValues) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res) {
        toast.error("Server did not respond.");
        return;
      }
      if (res.error) {
        toast.error("Invalid email or password.");
        return;
      }
      if (res.ok) {
        toast.success("Signed in successfully.");
        router.replace("/dashboard");
        return;
      }
      toast.error("Unexpected authentication response.");
    } catch (error) {
      console.error("Sign-in failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "Geist, sans-serif", color: "#595c5e", letterSpacing: "0.05em" }}
                >
                  Work Email
                </label>
                <FormControl>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@smartgearpicks.com"
                    disabled={loading}
                    autoComplete="email"
                    {...field}
                    className="admin-input w-full py-2.5 text-sm placeholder:text-[#767586]/50 transition-all"
                    style={{ color: "#0b1c30" }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ fontFamily: "Geist, sans-serif", color: "#595c5e", letterSpacing: "0.05em" }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-semibold uppercase tracking-widest transition-colors hover:opacity-70"
                    style={{
                      fontFamily: "Geist, sans-serif",
                      color: "#4648d4",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Recover
                  </a>
                </div>
                <FormControl>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      disabled={loading}
                      autoComplete="current-password"
                      {...field}
                      className="admin-input w-full py-2.5 pr-10 text-sm placeholder:text-[#767586]/50 transition-all"
                      style={{ color: "#0b1c30" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 transition-colors hover:opacity-80"
                      style={{ color: "#767586" }}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-60 mt-2"
          style={{
            backgroundColor: "#0b1c30",
            color: "#ffffff",
            fontFamily: "Geist, sans-serif",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          {loading ? (
            <>
              <span
                className="material-symbols-outlined text-[18px] animate-spin"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                progress_activity
              </span>
              Authenticating…
            </>
          ) : (
            <>
              Authenticate
              <span
                className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                arrow_forward
              </span>
            </>
          )}
        </button>
      </form>
    </Form>
  );
};

export default SignInCard;