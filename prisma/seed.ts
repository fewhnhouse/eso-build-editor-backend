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

async function skills() {
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
  });
}

async function sets() {
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

    await prisma.createMundusStone({
      name,
      aldmeri,
      daggerfall,
      ebonheart,
      effect,
      value: value + '',
      icon
    });
  });
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
    });
  });
}

async function modifications() {
  weaponGlyphs.forEach(async (glyph: any) => {
    const { type, modificationType, itemType, description, icon } = glyph;
    await prisma.createModification({
      type,
      modificationType: "glyph",
      itemType: "weapon",
      description,
      icon,
    });
  });
  armorGlyphs.forEach(async (glyph: any) => {
    const { type, modificationType, itemType, description, icon } = glyph;
    await prisma.createModification({
      type,
      modificationType: "glyph",
      itemType: "armor",
      description,
      icon,
    });
  });
  jewelryGlyphs.forEach(async (glyph: any) => {
    const { type, modificationType, itemType, description, icon } = glyph;
    await prisma.createModification({
      type,
      modificationType: "glyph",
      itemType: "jewelry",
      description,
      icon,
    });
  });
  weaponTraits.forEach(async (trait: any) => {
    const { type, modificationType, itemType, description, icon } = trait;
    await prisma.createModification({
      type,
      modificationType: "trait",
      itemType: "weapon",
      description,
      icon,
    });
  });
  armorTraits.forEach(async (trait: any) => {
    const { type, modificationType, itemType, description, icon } = trait;
    await prisma.createModification({
      type,
      modificationType: "trait",
      itemType: "armor",
      description,
      icon,
    });
  });

  jewelryTraits.forEach(async (trait: any) => {
    const { type, modificationType, itemType, description, icon } = trait;
    await prisma.createModification({
      type,
      modificationType: "trait",
      itemType: "jewelry",
      description,
      icon,
    });
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
}

mundus();
buffs();
modifications();
sets();
skills();
