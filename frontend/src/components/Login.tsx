import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";
import logoImage from "figma:asset/13429f3bf73f16f4f94cb74ce47b8a5ef9aa39a9.png";

interface LoginProps {
  onLogin: () => void;
  onSignup: () => void;
  onFindAccount: (type: "id" | "password") => void;
  onBack: () => void;
}

export function Login({ onLogin, onSignup, onFindAccount, onBack }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    // Mock login - accept any non-empty credentials
    setError("");
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <button onClick={onBack} className="hover:opacity-70 transition-opacity">
              <img src={logoImage} alt="어디가개" className="h-24 mb-4" />
            </button>
            <p className="text-gray-600">로그인하여 시작하기</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="username">아이디</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 h-12 mb-4 text-gray-900"
          >
            로그인
          </Button>

          {/* Additional Actions */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => onFindAccount("id")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              아이디 찾기
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => onFindAccount("password")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              비밀번호 찾기
            </button>
          </div>

          {/* Signup Button */}
          <Button
            onClick={onSignup}
            variant="outline"
            className="w-full border-gray-900 hover:bg-gray-50 h-12"
          >
            회원가입
          </Button>

          {/* Back Button */}
          <Button
            onClick={onBack}
            variant="ghost"
            className="w-full mt-2"
          >
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
