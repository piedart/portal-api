import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { UserDocument } from 'src/database/schemas/UserSchema';
import { UserDetails } from 'src/utils/types/UserDetails';
import { IUserService } from './interfaces/user';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  createUser(req: any, details: UserDetails) {
    // console.log(this.userModel.schema);
    console.log('Create User');

    return axios
      .get(
        `https://v3.blox.link/developer/discord/${details.discordId}?guildId=679022252590891068`,
        { headers: { 'api-key': '58757e0a-5bbe-4bee-b181-10cdfe9f175c' } },
      )
      .then(async (res) => {
        console.log(res.data.user);
        if (Object.keys(res.data.user).length === 0) {
          req.logOut((data) => {
            console.log(data);
          });
          return;
        }

        const robloxUserId = res.data.user.robloxId;
        const robloxUser = (
          await axios.get(`https://users.roblox.com/v1/users/${robloxUserId}`)
        ).data;

        const robloxUserGroup = (
          await axios.get(
            `https://groups.roblox.com/v2/users/${robloxUserId}/groups/roles`,
          )
        ).data.data.find((data) => data.group.id === 1197643);

        if (!robloxUserGroup) {
          req.logOut((data) => {
            console.log(data);
          });
          return;
        }

        const robloxUserGroupRank = robloxUserGroup.role.name.slice(1, 4);
        const robloxUserGroupRankName = robloxUserGroup.role.name.slice(
          6,
          robloxUserGroup.role.name.length,
        );

        console.log(robloxUserGroupRank);

        let permissionLevel;
        if (robloxUserGroupRank.startsWith('[OR')) {
          if (
            Number(robloxUserGroupRank[4]) < 5 &&
            Number(robloxUserGroupRank[4] > 1)
          )
            permissionLevel = 1;
          else if (
            Number(robloxUserGroupRank[4] > 4) &&
            Number(robloxUserGroupRank[4] < 8)
          )
            permissionLevel = 3;
          else if (
            Number(robloxUserGroupRank[4] > 7) &&
            Number(robloxUserGroupRank[4] < 10)
          )
            permissionLevel = 4;
        } else if (robloxUserGroupRank.startsWith('[OF')) {
          if (
            Number(robloxUserGroupRank[4]) < 5 &&
            Number(robloxUserGroupRank[4] > 0)
          )
            permissionLevel = 5;
          else if (
            Number(robloxUserGroupRank[4] > 5) &&
            Number(robloxUserGroupRank[4] < 11)
          )
            permissionLevel = 6;
        }

        console.log(robloxUser);
        return this.userModel.create({
          discordId: details.discordId,
          robloxId: robloxUserId,
          robloxUsername: robloxUser.name,
          rank: robloxUserGroupRank,
          rankName: robloxUserGroupRankName,
          permissionLevel: permissionLevel,
        });
      });
  }

  findUser(discordId: string) {
    console.log('Find User');
    return this.userModel.findOne({ discordId });
  }
}
