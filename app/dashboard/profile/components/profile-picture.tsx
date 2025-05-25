import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const avatarslists = [
  '/avatars/13b485a8-99a1-4527-81dc-b1b96f3adf8f.jpg',
 '/avatars/3a66e288-ca63-442e-965d-b95ab95a6aae.jpg',
 '/avatars/3D Avatar Collection Vol_01 by Arthur Sjorgen for….jpg',
 '/avatars/66b36e0c-9259-4578-ae67-67d095155437.jpg',
 '/avatars/7a551953-39ef-4a81-9abb-22f7fca90102.jpg',
 '/avatars/a0fd73a9-88d7-4d86-9bb7-af9396c50962.jpg',
 '/avatars/a1.jpg',
 '/avatars/af43dc4c-2ee6-4619-8edc-6a7e8a53d05b.jpg',
 '/avatars/avatar01.jpg',
 '/avatars/avatar02.jpg',
 '/avatars/avatar03.jpg',
 '/avatars/avatar04.jpg',
 '/avatars/avatar05.jpg',
 '/avatars/avatar08.jpg',
 '/avatars/avatar10.jpg',
 '/avatars/avatar11.jpg',
 '/avatars/avatar12.jpg',
 '/avatars/avatar13.jpg',
 '/avatars/avatar14.jpg',
 '/avatars/avatar15.jpg',
 '/avatars/avatar16.jpg',
 '/avatars/avatar17.jpg',
 '/avatars/avatar18.jpg',
 '/avatars/avatar19.jpg',
 '/avatars/avatar20.jpg',
 '/avatars/c173086f-ea1a-4aef-80b0-64b07bcc0c0e.jpg',
 '/avatars/d2b7e242-6dc4-41ab-9719-1854dd5be419.jpg',
 '/avatars/f9d01491-8ab2-40f5-98ae-f024f9418804.jpg',
 "/avatars/Personnage d'Avatar en 3D _ Photo Premium.jpg",
 '/avatars/Trouvez et téléchargez des ressources graphiques… (1).jpg',
 '/avatars/Trouvez et téléchargez des ressources graphiques….jpg']

export function ProfilePicture({ avatarUrl, onChange }: { avatarUrl: string; onChange: (url: string) => void }) {
  const [showGrid, setShowGrid] = useState(false);
  const [saving, setSaving] = useState(false);

  // Save avatar to Supabase and update parent
  const handleAvatarSelect = async (url: string) => {
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ data: { avatarUrl: url } });
      if (!error) {
        onChange(url); // update parent state
        window.dispatchEvent(new Event("avatar-updated"));
      }
    } finally {
      setSaving(false);
      setShowGrid(false);
    }
  };

  return (
    <div>
      <Image
        src={avatarUrl || "/placeholder.svg?height=96&width=96"}
        alt="User Avatar"
        width={96}
        height={96}
        className="rounded-full cursor-pointer"
        onClick={() => setShowGrid(true)}
      />
      {showGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg grid grid-cols-4 gap-4 max-h-[80vh] overflow-y-auto">
            {avatarslists.map((avatar, idx) => (
              <Button
                key={avatar}
                className={`focus:outline-none ${saving ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => handleAvatarSelect(avatar)}
                disabled={saving}
              >
                <Image
                  src={avatar}
                  alt={`Avatar ${idx + 1}`}
                  width={64}
                  height={64}
                  className="rounded-full border-2 hover:border-blue-500"
                />
              </Button>
            ))}
          </div>
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setShowGrid(false)}
            disabled={saving}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}