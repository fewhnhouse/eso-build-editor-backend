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

    const dbMundus = await prisma.mundusStone({ name })

    if (!dbMundus) {

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
        fs.appendFileSync('log.txt', `Create Mundus: ${name}\n`)

        console.log("Update:", name)

        console.log("Mundus created: ", name)
      }
      catch (e) {
        console.error(e)
      }
    } else {
      try {
        await prisma.updateMundusStone({
          data: {
            aldmeri,
            daggerfall,
            ebonheart,
            effect,
            value: value + '',
            icon
          }, where: { name }
        });
        fs.appendFileSync('log.txt', `Update Mundus: ${name}\n`)

        console.log("Mundus updated: ", name)
      }
      catch (e) {
        console.error(e)
      }
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
    const dbModification = await prisma.modifications({ where: { type, modificationType, itemType, icon } })

    if (!dbModification.length) {
      try {
        await prisma.createModification({
          type,
          modificationType: "glyph",
          itemType: "weapon",
          description,
          icon,
        });
        fs.appendFileSync('log.txt', `Create Weapon Glyph\n`)
        console.log("Weapon Glyph created: ")
      } catch (e) {
        console.error(e)
      }
    } else {
      await prisma.updateModification({
        data: {
          type,
          description,
          icon,

        }, where: { id: dbModification[0].id }
      })
      fs.appendFileSync('log.txt', `Update Weapon Glyph\n`)
      console.log("Weapon Glyph updated: ", description)

    }
  });
  armorGlyphs.forEach(async (glyph: any) => {
    const { type, modificationType, itemType, description, icon } = glyph;
    const dbModification = await prisma.modifications({ where: { type, modificationType, itemType, icon } })

    if (!dbModification.length) {
      try {
        await prisma.createModification({
          type,
          modificationType: "glyph",
          itemType: "armor",
          description,
          icon,
        });
        fs.appendFileSync('log.txt', `Create Armor Glyph\n`)
        console.log("Armor Glyph created: ")
      } catch (e) {
        console.error(e)
      }
    } else {
      await prisma.updateModification({
        data: {
          type,
          description,
          icon,

        }, where: { id: dbModification[0].id }
      })
      fs.appendFileSync('log.txt', `Update Armor Glyph\n`)
      console.log("Armor Glyph updated: ", description)
    }
  });
  jewelryGlyphs.forEach(async (glyph: any) => {
    const { type, modificationType, itemType, description, icon } = glyph;
    const dbModification = await prisma.modifications({ where: { type, modificationType, itemType, icon } })

    if (!dbModification.length) {

      try {
        await prisma.createModification({
          type,
          modificationType: "glyph",
          itemType: "jewelry",
          description,
          icon,
        });
        fs.appendFileSync('log.txt', `Create Jewelry Glyph\n`)
        console.log("Jewelry Glyph created: ")
      } catch (e) {
        console.error(e)
      }
    }
    else {
      await prisma.updateModification({
        data: {
          type,
          description,
          icon,

        }, where: { id: dbModification[0].id }
      })
      fs.appendFileSync('log.txt', `Update Jewelry Glyph\n`)
      console.log("Jewelry Glyph updated: ", description)
    }
  });
  weaponTraits.forEach(async (trait: any) => {
    const { type, modificationType, itemType, description, icon } = trait;
    const dbModification = await prisma.modifications({ where: { type, modificationType, itemType, icon } })

    if (!dbModification.length) {

      try {
        await prisma.createModification({
          type,
          modificationType: "trait",
          itemType: "weapon",
          description,
          icon,
        });
        fs.appendFileSync('log.txt', `Create Weapon Trait\n`)
        console.log("Weapon Trait created: ")
      }
      catch (e) {
        console.error(e)
      }
    } else {
      await prisma.updateModification({
        data: {
          type,
          description,
          icon,

        }, where: { id: dbModification[0].id }
      })
      fs.appendFileSync('log.txt', `Update Weapon Trait\n`)
      console.log("Weapon Trait updated: ", description)

    }
  });
  armorTraits.forEach(async (trait: any) => {
    const { type, modificationType, itemType, description, icon } = trait;
    const dbModification = await prisma.modifications({ where: { type, modificationType, itemType, icon } })

    if (!dbModification.length) {

      try {

        await prisma.createModification({
          type,
          modificationType: "trait",
          itemType: "armor",
          description,
          icon,
        });
        fs.appendFileSync('log.txt', `Create Armor Trait\n`)
        console.log("Armor Trait created: ")
      } catch (e) {
        console.error(e)
      }
    } else {
      await prisma.updateModification({
        data: {
          type,
          description,
          icon,

        }, where: { id: dbModification[0].id }
      })
      fs.appendFileSync('log.txt', `Update Armor Trait\n`)
      console.log("Armor Trait updated: ", description)

    }
  });

  jewelryTraits.forEach(async (trait: any) => {
    const { type, modificationType, itemType, description, icon } = trait;
    const dbModification = await prisma.modifications({ where: { type, modificationType, itemType, icon } })

    if (!dbModification.length) {
      try {

        await prisma.createModification({
          type,
          modificationType: "trait",
          itemType: "jewelry",
          description,
          icon,
        });
        fs.appendFileSync('log.txt', `Create Jewelry Trait\n`)
        console.log("Jewelry Trait created: ")
      } catch (e) {
        console.error(e)
      }
    } else {
      await prisma.updateModification({
        data: {
          type,
          description,
          icon,

        }, where: { id: dbModification[0].id }
      })
      fs.appendFileSync('log.txt', `Update Jewelry Trait\n`)
      console.log("Jewelry Trait updated: ", description)

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
  // await modifications()
  await sets()
  await skills()
  // await users()
}

execute()
