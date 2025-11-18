import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { useAuth } from "../context/authContextAndApi"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field"
import { Input } from "../components/ui/input"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function LoginForm({
  setIsRegister, onNavigate, className, ...props
}) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      return; 
    }


    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#171717] border-[#2E2F2F] overflow-hidden font-geist">
        <CardHeader>
          <CardTitle className="text-gray-50">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSumbit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-gray-50">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="border-[#2E2F2F] text-gray-200 bg-[#171717]"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-gray-50">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-[#FAFAFA] text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="border-[#2E2F2F] text-gray-300 bg-[#171717]" required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button
                  className="text-center text-black bg-gray-200 hover:bg-gray-300"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 inline animate-spin mr-2" /> : 'Login'}
                </Button>
                <FieldDescription className="text-center text-gray-400">
                  Don&apos;t have an account?
                  <button
                    // --- CRITICAL FIX: Switches to the Register view ---
                    onClick={(e) => { e.preventDefault(); setIsRegister(true); }}
                    className="ml-1 text-indigo-400 hover:text-indigo-300 underline-offset-4 hover:underline"
                  >
                    Sign up
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
