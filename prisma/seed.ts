import { mundusStones } from './mundusData';
import { allBuffs } from './buffData';
import { prisma } from '../src/generated/prisma-client';
import axios from 'axios';
import {
  weaponGlyphs,
  armorGlyphs,
  jewelryGlyphs,
  weaponTraits,
  armorTraits,
  jewelryTraits,
} from './modificationData';
require('dotenv').config();
const fs = require('fs');

async function skills() {
  fs.appendFileSync('log.txt', `------------------------------------------ SKILLS -------------------------------------------------------\n`)

  console.log("------------------------------------------ SKILLS -------------------------------------------------------")
  const { data } = await axios.get(
    'https://beast.pathfindermediagroup.com/api/eso/skills',
    {
      headers: { Authorization: `Basic ${process.env.API_TOKEN}` },
    }
  );
  data.forEach(async (skill: any) => {
    const {
      cast_time,
      cost,
      effect_1,
      effect_2,
      icon,
      id,
      name,
      parent,
      pts,
      range,
      skillline,
      slug,
      target,
      type,
      unlocks_at,
    } = skill;

    const dbSkill = await prisma.skill({ skillId: id })

    if (!dbSkill) {
      console.log("Create:", name)
      fs.appendFileSync('log.txt', `Create Skill: ${name}\n`)
      await prisma.createSkill({
        cast_time,
        cost,
        effect_1,
        effect_2,
        icon,
        skillId: id,
        name,
        parent,
        pts,
        range,
        skillline,
        slug,
        target,
        type,
        unlocks_at,
      });
    } else {
      console.log("Update:", name)
      fs.appendFileSync('log.txt', `Update Skill: ${name}\n`)

      await prisma.updateSkill({
        data: {
          cast_time,
          cost,
          effect_1,
          effect_2,
          icon,
          name,
          parent,
          pts,
          range,
          skillline,
          slug,
          target,
          type,
          unlocks_at,
        }, where: { skillId: id }
      })

    }
  });
}

async function sets() {
  fs.appendFileSync('log.txt', `------------------------------------------ SETS -------------------------------------------------------\n`)

  console.log("------------------------------------------ SETS -------------------------------------------------------")

  const { data } = await axios.get(
    'https://beast.pathfindermediagroup.com/api/eso/sets',
    {
      headers: { Authorization: `Basic ${process.env.API_TOKEN}` },
    }
  );
  data.forEach(async (set: any) => {
    const {
      id,
      name,
      location,
      type,
      slug,
      bonus_item_1,
      bonus_item_2,
      bonus_item_3,
      bonus_item_4,
      bonus_item_5,
      has_jewels,
      has_weapons,
      has_heavy_armor,
      has_medium_armor,
      has_light_armor,
      traits_needed,
      pts,
      eso_id,
    } = set;
    const dbSet = await prisma.set({ setId: id })

    if (!dbSet) {
      fs.appendFileSync('log.txt', `Create Set: ${name}\n`)

      console.log("Create:", name)
      await prisma.createSet({
        setId: id,
        name,
        location,
        type,
        slug,
        bonus_item_1,
        bonus_item_2,
        bonus_item_3,
        bonus_item_4,
        bonus_item_5,
        has_jewels,
        has_weapons,
        has_heavy_armor,
        has_medium_armor,
        has_light_armor,
        traits_needed,
        pts,
        eso_id,
      });
    } else {
      fs.appendFileSync('log.txt', `Update Set: ${name}\n`)

      console.log("Update:", name)
      await prisma.updateSet({
        data: {
          name,
          location,
          type,
          slug,
          bonus_item_1,
          bonus_item_2,
          bonus_item_3,
          bonus_item_4,
          bonus_item_5,
          has_jewels,
          has_weapons,
          has_heavy_armor,
          has_medium_armor,
          has_light_armor,
          traits_needed,
          pts,
          eso_id,
        }, where: { setId: id }
      })
    }
  });
}


async function mundus() {
  mundusStones.forEach(async (mundus: any) => {
    const {
      name,
      location: { aldmeri, daggerfall, ebonheart },
      effect,
      value,
      icon
    } = mundus;
    try {

      await prisma.createMundusStone({
        name,
        aldmeri,
        daggerfall,
        ebonheart,
        effect,
        value: value + '',
        icon
      });
      console.log("mundus created: ", name)
    }
    catch (e) {
      console.error(e)
    }

  })

}

async function buffs() {
  allBuffs.forEach(async (buff: any) => {
    const {
      name,
      buffDescription,
      description,
      duration,
      notes,
      quality,
      type,
      buffType,
      icon
    } = buff;
    try {
      await prisma.createBuff({
        name,
        buffDescription,
        description,
        duration,
        notes,
        quality,
        type,
        buffType,
        icon
      })
      console.log("buff created: ", name)
    } catch (e) {
      console.error(e)
    }
  });
}

async function modifications() {
  weaponGlyphs.forEach(async (glyph: any) => {
    const { type, modificationType, itemType, description, icon } = glyph;
    try {
      await prisma.createModification({
        type,
        modificationType: "glyph",
        itemType: "weapon",
        description,
        icon,
      });
      console.log("weapon glyph created: ", name)
    } catch (e) {
      console.error(e)
    }
  });
  armorGlyphs.forEach(async (glyph: any) => {
    const { type, modificationType, itemType, description, icon } = glyph;
    try {
      await prisma.createModification({
        type,
        modificationType: "glyph",
        itemType: "armor",
        description,
        icon,
      });
      console.log("armor glyph created: ", name)
    } catch (e) {
      console.error(e)
    }
  });
  jewelryGlyphs.forEach(async (glyph: any) => {
    const { type, modificationType, itemType, description, icon } = glyph;
    try {
      await prisma.createModification({
        type,
        modificationType: "glyph",
        itemType: "jewelry",
        description,
        icon,
      });
      console.log("jewelry glyph created: ", name)
    } catch (e) {
      console.error(e)
    }
  });
  weaponTraits.forEach(async (trait: any) => {
    const { type, modificationType, itemType, description, icon } = trait;
    try {
      await prisma.createModification({
        type,
        modificationType: "trait",
        itemType: "weapon",
        description,
        icon,
      });
      console.log("weapon trait created: ", name)
    }
    catch (e) {
      console.error(e)
    }
  });
  armorTraits.forEach(async (trait: any) => {
    const { type, modificationType, itemType, description, icon } = trait;
    try {

      await prisma.createModification({
        type,
        modificationType: "trait",
        itemType: "armor",
        description,
        icon,
      });
      console.log("armor trait created: ", name)
    } catch (e) {
      console.error(e)
    }
  });

  jewelryTraits.forEach(async (trait: any) => {
    const { type, modificationType, itemType, description, icon } = trait;
    try {

      await prisma.createModification({
        type,
        modificationType: "trait",
        itemType: "jewelry",
        description,
        icon,
      });
      console.log("jewelry trait created: ", name)
    } catch (e) {
      console.error(e)
    }

  });
}

async function users() {
  await prisma.createUser({
    email: 'felix@prisma.io',
    name: 'Felix',
    password: '$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m', // "secret42"
  });
  await prisma.createUser({
    email: 'kaisa@prisma.io',
    name: 'Kaisa',
    password: '$2b$10$o6KioO.taArzboM44Ig85O3ZFZYZpR3XD7mI8T29eP4znU/.xyJbW', // "secret43"
  });
  await prisma.createUser({
    email: 'fist@prisma.io',
    name: 'Fist',
    password: '$2a$10$UvmfHvGKLz5gNydXKbq7Uelmdljes0RbpEB6rXeB.VnakznLfv6GG',
  })
}

const execute = async () => {
  // await mundus()
  // await buffs()
  await modifications()
  // await sets()
  // await skills()
  // await users()
}

execute()
