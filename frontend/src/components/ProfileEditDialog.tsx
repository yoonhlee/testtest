import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Camera } from "lucide-react";

interface ProfileEditDialogProps {
  open: boolean;
  onClose: () => void;
  currentNickname: string;
  profileInitial: string;
  onSave: (nickname: string) => void;
}

export function ProfileEditDialog({
  open,
  onClose,
  currentNickname,
  profileInitial,
  onSave,
}: ProfileEditDialogProps) {
  const [nickname, setNickname] = useState(currentNickname);

  const handleSave = () => {
    onSave(nickname);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Photo Section */}
          <div>
            <Label className="text-gray-600 mb-3 block">프로필 사진</Label>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-5xl text-yellow-600">{profileInitial}</span>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                사진 선택
              </Button>
            </div>
          </div>

          {/* Nickname Input */}
          <div>
            <Label htmlFor="nickname" className="text-gray-600 mb-2 block">
              닉네임
            </Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="bg-gray-50"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1">
            취소
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-gray-900"
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
