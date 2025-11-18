import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"
import { useState } from "react"
import { useAuth } from "../context/authContextAndApi"
import { Loader2 } from "lucide-react"

export function SignupForm({
  setIsRegister,
  ...props
}) {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !email || !password) {
      setIsLoading(false);
      return;
    }

    try {
      await register(username, email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-[#171717] border-[#2E2F2F] overflow-hidden font-geist" {...props}>
      <CardHeader>
        <CardTitle className="text-gray-50">Create an account</CardTitle>
        <CardDescription className="text-gray-400">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name" className="text-gray-50">Username</FieldLabel>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                className="border-[#2E2F2F] text-gray-200 bg-[#171717]"
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email" className="text-gray-50">Email</FieldLabel>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                className="border-[#2E2F2F] text-gray-200 bg-[#171717]"
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FieldDescription className="text-gray-400">
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password" className="text-gray-50">Password</FieldLabel>
              <Input 
                id="password" 
                type="password" 
                className="border-[#2E2F2F] text-gray-200 bg-[#171717]"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FieldDescription className="text-gray-400">
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <Button 
                type="submit" 
                className="text-center text-black bg-gray-200 hover:bg-gray-300 w-full"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 inline animate-spin mr-2" /> : 'Create Account'}
              </Button>
              <FieldDescription className="text-center text-gray-400 mt-2">
                Already have an account?{" "}
                <button
                  onClick={(e) => { e.preventDefault(); setIsRegister(false); }}
                  className="text-indigo-400 hover:text-indigo-300 underline-offset-4 hover:underline"
                >
                  Sign in
                </button>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
