import { prisma } from '../src/generated/prisma-client';
import axios from 'axios';
const fs = require('fs');
require('dotenv').config();

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

skills().then(res => sets())
