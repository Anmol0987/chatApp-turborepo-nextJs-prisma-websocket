import { ArrowRight, Lock } from "lucide-react";
export default function RoomCard({ name, members, isPrivate }: {
    name: string;
    members: number;
    isPrivate: boolean;
  }) {
    return (
      <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/10">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium">{name}</h4>
              {isPrivate && <Lock className="w-4 h-4 text-gray-400" />}
            </div>
            <p className="text-sm text-gray-400">{members} members</p>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }
  