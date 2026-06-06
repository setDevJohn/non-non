import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui';
import { X, Shield } from 'lucide-react-native';
import { Participant } from '@/types/event';

interface ParticipantListProps {
  participants: Participant[];
  currentUserId: string;
  isAdmin: boolean;
  onRemoveParticipant?: (participantId: string) => void;
  onPromoteAdmin?: (participantId: string) => void;
}

export const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  currentUserId,
  isAdmin,
  onRemoveParticipant,
  onPromoteAdmin,
}) => {
  return (
    <View className="gap-3">
      {participants.map((participant) => (
        <Card key={participant.userId} className="p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-zinc-800 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-lg">
                  {participant.userName?.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base">
                  {participant.userName}
                </Text>
                <Text className="text-zinc-400 text-sm">
                  {participant.points} pts • #{participant.ranking}
                </Text>
              </View>
            </View>

            {isAdmin && participant.userId !== currentUserId && (
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => onPromoteAdmin?.(participant.userId)}
                  className="bg-zinc-800 p-2 rounded-xl"
                >
                  <Shield size={18} color="#a1a1aa" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onRemoveParticipant?.(participant.userId)}
                  className="bg-red-500/20 p-2 rounded-xl"
                >
                  <X size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
      ))}
    </View>
  );
};
