import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff, Check } from "lucide-react";
import logoImage from "figma:asset/13429f3bf73f16f4f94cb74ce47b8a5ef9aa39a9.png";

interface SignupProps {
  onSignup: () => void;
  onBack: () => void;
}

export function Signup({ onSignup, onBack }: SignupProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    nickname: "",
    birthdate: "",
    phone: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checks, setChecks] = useState({
    username: false,
    email: false,
    nickname: false,
  });

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCheckDuplicate = (field: "username" | "email" | "nickname") => {
    // Mock duplicate check
    setChecks({ ...checks, [field]: true });
    setErrors({ ...errors, [field]: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (checks[field as keyof typeof checks]) {
      setChecks({ ...checks, [field]: false });
    }
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) newErrors.username = "아이디를 입력하세요";
    else if (formData.username.length < 4)
      newErrors.username = "아이디는 4자리 이상이어야 합니다";
    else if (!checks.username) newErrors.username = "중복확인이 필요합니다";

    if (!formData.email) newErrors.email = "이메일을 입력하세요";
    else if (!validateEmail(formData.email))
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    else if (!checks.email) newErrors.email = "중복확인이 필요합니다";

    if (!formData.password) newErrors.password = "비밀번호를 입력하세요";
    else if (!validatePassword(formData.password))
      newErrors.password = "영어, 숫자, 특수기호 포함 8자리 이상";

    if (formData.password !== formData.passwordConfirm)
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다";

    if (!formData.name) newErrors.name = "이름을 입력하세요";

    if (!formData.nickname) newErrors.nickname = "닉네임을 입력하세요";
    else if (!checks.nickname) newErrors.nickname = "중복확인이 필요합니다";

    if (!formData.birthdate) newErrors.birthdate = "생년월일을 입력하세요";
    else if (formData.birthdate.length !== 8)
      newErrors.birthdate = "YYYYMMDD 형식 8자리";

    if (!formData.phone) newErrors.phone = "연락처를 입력하세요";
    else if (!/^\d{10,11}$/.test(formData.phone))
      newErrors.phone = "10-11자리 숫자만 입력";

    if (!formData.address) newErrors.address = "주 활동지역을 입력하세요";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSignup();
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <button onClick={onBack} className="hover:opacity-70 transition-opacity">
              <img src={logoImage} alt="어디가개" className="h-24 mb-4" />
            </button>
            <h1 className="text-3xl mb-2">회원가입</h1>
            <p className="text-gray-600">어디가개와 함께 시작하세요</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Username */}
            <div>
              <Label htmlFor="username">아이디 *</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  placeholder="4자리 이상의 아이디를 입력하세요"
                  className={errors.username ? "border-red-500" : ""}
                />
                <Button
                  onClick={() => handleCheckDuplicate("username")}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {checks.username ? <Check className="w-4 h-4 text-green-500" /> : "중복확인"}
                </Button>
              </div>
              {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">이메일 *</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="example@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                <Button
                  onClick={() => handleCheckDuplicate("email")}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {checks.email ? <Check className="w-4 h-4 text-green-500" /> : "중복확인"}
                </Button>
              </div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">비밀번호 *</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="영어, 숫자, 특수기호 포함 8자리 이상"
                  className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Password Confirm */}
            <div>
              <Label htmlFor="passwordConfirm">비밀번호 확인 *</Label>
              <div className="relative mt-1">
                <Input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={formData.passwordConfirm}
                  onChange={(e) => handleChange("passwordConfirm", e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  className={`pr-10 ${errors.passwordConfirm ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPasswordConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.passwordConfirm && <p className="text-sm text-red-500 mt-1">{errors.passwordConfirm}</p>}
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="이름을 입력하세요"
                className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Nickname */}
            <div>
              <Label htmlFor="nickname">닉네임 *</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => handleChange("nickname", e.target.value)}
                  placeholder="닉네임을 입력하세요"
                  className={errors.nickname ? "border-red-500" : ""}
                />
                <Button
                  onClick={() => handleCheckDuplicate("nickname")}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {checks.nickname ? <Check className="w-4 h-4 text-green-500" /> : "중복확인"}
                </Button>
              </div>
              {errors.nickname && <p className="text-sm text-red-500 mt-1">{errors.nickname}</p>}
            </div>

            {/* Birthdate */}
            <div>
              <Label htmlFor="birthdate">생년월일 *</Label>
              <Input
                id="birthdate"
                value={formData.birthdate}
                onChange={(e) => handleChange("birthdate", e.target.value.replace(/\D/g, ""))}
                placeholder="YYYYMMDD (예: 19900101)"
                maxLength={8}
                className={`mt-1 ${errors.birthdate ? "border-red-500" : ""}`}
              />
              {errors.birthdate && <p className="text-sm text-red-500 mt-1">{errors.birthdate}</p>}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">연락처 *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))}
                placeholder="01012345678"
                maxLength={11}
                className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">주 활동지역 *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="대구 경산시 대학로 280"
                className={`mt-1 ${errors.address ? "border-red-500" : ""}`}
              />
              {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <Button onClick={onBack} variant="outline" className="flex-1">
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-gray-900"
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
