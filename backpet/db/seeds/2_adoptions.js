/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('adoptions').del();

  const dummyData = [
    {
      id: 1,
      old_owner_id: 2,
      pet_name: 'Bonifácio',
      pet_species: 'gato',
      pet_breed: 'persa',
      pet_color: 'cinza',
      pet_age: 24, // 2 anos no cadastro => 24 meses no banco
      pet_size: 'S',
      desc: `Crescido na rua, muito arteiro mas é um bom menino (bom menino vale pra gato também? não sei). Com a inflação, não tenho mais como sustentar todos os meus gatos. Por isso, eu quero um novo lar pra ele.`,
    },
    {
      id: 2,
      old_owner_id: 2,
      pet_name: 'Teobaldo',
      pet_species: 'gato',
      pet_breed: 'siamês',
      pet_color: 'cinza',
      pet_age: 11,
      pet_size: 'S',
      desc: `Bicho muito metido, não te respeita de jeito nenhum e joga seus copos de cristal italiano no chão sem dó. E isso é o normal dele. Se ele pegar ódio de você, vai ter surpresa no lençol.`,
    },
    {
      id: 3,
      old_owner_id: 2,
      pet_name: 'Tereza',
      pet_species: 'cachorro',
      pet_breed: 'labrador',
      pet_color: 'marrom',
      pet_size: 'L',
      desc: `Encontrei na rua a alguns dias, estava com fome mas parece bem. Não tenho como cuidar dela, então estou procurando um lar para ela.`,
    },
    {
      id: 4,
      old_owner_id: 3,
      pet_name: 'Mel',
      pet_species: 'cachorro',
      pet_breed: 'poodle',
      pet_color: 'branco',
      pet_age: 0,
      pet_size: 'M',
      desc: `Meu cachorro saiu com uma cadela pra tomar um café. A dona da cadela me encarregou de cuidar da ninhada.`,
    },
    {
      id: 5,
      old_owner_id: 3,
      pet_size: 'S',
      desc: `Encontrei essa lagartixa ontem, alguém quer?`,
    },
  ];
  await knex('adoptions').insert(dummyData);

  await knex.raw(
    `ALTER TABLE adoptions AUTO_INCREMENT=${dummyData.length + 1}`
  );
};
