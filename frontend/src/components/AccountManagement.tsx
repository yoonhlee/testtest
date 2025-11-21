import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Settings, Trash2 } from "lucide-react";
import logoImage from "figma:asset/13429f3bf73f16f4f94cb74ce47b8a5ef9aa39a9.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface AccountManagementProps {
  user: {
    name: string;
    nickname: string;
    email: string;
    phone: string;
    birthdate: string;
    address: string;
  };
  onBack: () => void;
  onUpdateField: (field: string, value: string) => void;
  onDeleteAccount: () => void;
}

export function AccountManagement({
  user,
  onBack,
  onUpdateField,
  onDeleteAccount,
}: AccountManagementProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSave = (field: string) => {
    onUpdateField(field, editValue);
    setEditingField(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  const handleDeleteAccount = () => {
    if (deletePassword) {
      onDeleteAccount();
      setShowDeleteDialog(false);
      setDeletePassword("");
    }
  };

  const renderField = (
    label: string,
    fieldName: string,
    value: string,
    showPreview: boolean = false
  ) => {
    const isEditing = editingField === fieldName;

    return (
      <div className="py-4 border-b border-gray-100 last:border-0">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-gray-600">{label}</Label>
          <div className="flex gap-2">
            {showPreview && (
              <Button variant="outline" size="sm" className="text-gray-600">
                미리보기
              </Button>
            )}
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(fieldName, value)}
              >
                수정
              </Button>
            )}
          </div>
        </div>
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="bg-white"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                size="sm"
                onClick={() => handleSave(fieldName)}
                className="flex-1 bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-gray-900"
              >
                저장
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-900">
            {fieldName === "password" ? "••••••••" : value}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto px-6 h-20 flex items-center gap-4">
          <button onClick={onBack} className="hover:opacity-70 transition-opacity">
            <img src={logoImage} alt="어디가개" className="h-20" />
          </button>
          <h1 className="text-xl">계정관리</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-8">
        {/* Account Info Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <h2 className="flex items-center gap-2 mb-6 text-gray-700">
            <Settings className="w-5 h-5" />
            계정 정보
          </h2>

          <div className="space-y-0">
            {renderField("이름", "name", user.name)}
            {renderField("전화번호", "phone", user.phone)}
            {renderField("생년월일", "birthdate", user.birthdate)}
            {renderField("이메일", "email", user.email)}
            {renderField("거주지 주소", "address", user.address, true)}
            {renderField("비밀번호", "password", "password123!")}
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-4">
          <p className="text-sm text-gray-600 text-center mb-4">
            계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
          </p>
          <Button
            variant="destructive"
            className="w-full bg-red-500 hover:bg-red-600"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            계정 삭제
          </Button>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>계정 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              계속하려면 비밀번호를 입력해주세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletePassword("")}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-500 hover:bg-red-600"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
