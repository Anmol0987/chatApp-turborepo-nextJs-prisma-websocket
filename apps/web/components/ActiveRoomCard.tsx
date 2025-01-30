import { Plus } from "lucide-react";
import RoomCard from "./RoomCard";
export default function ActiveRoomCard() {
    return (
        <div className="relative">
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Active Rooms</h3>
                    <button className="p-2 flex items-center justify-center border-white/20 border-2 hover:bg-white/10 rounded-full transition gap-2">
                        <Plus className="w-5 h-5" />
                        <span>Create Room</span>
                    </button>
                </div>

                <div className="space-y-4">
                    <RoomCard
                        name="Design Team Sync"
                        members={8}
                        isPrivate={true}
                    />
                    <RoomCard
                        name="Coffee Chat"
                        members={12}
                        isPrivate={false}
                    />
                    <RoomCard
                        name="Project Alpha Discussion"
                        members={5}
                        isPrivate={true}
                    />
                </div>
            </div>
        </div>
    )
}