class PokemonPageInfoModel {
  constructor(
    public name: string,
    public img: string | null,
    public id: number,
    public abilities: { ability: { name: string } }[],
    public types: { type: { name: string } }[],
    public forms: { name: string }[],
    public stats: { base_stat: number; stat: { name: string } }[],
    public exp: number,
    public height: number
  ) {
    this.name = name;
    this.img = img;
    this.id = id;
    this.abilities = abilities;
    this.types = types;
    this.forms = forms;
    this.stats = stats;
    this.exp = exp;
    this.height = height;
  }

  get getAbilities() {
    return this.abilities.map(({ ability: { name } }) => {
      return name;
    });
  }

  get getTypes() {
    return this.types.map(({ type: { name } }) => {
      return name;
    });
  }

  get getForms() {
    return this.forms.map(({ name }) => {
      return name;
    });
  }
  get getStats() {
    return this.stats.map(({ stat: { name }, base_stat }) => {
      return {
        statName: name,
        statValue: base_stat,
      };
    });
  }

  get generateName() {
    return `  ${this.name.slice(0, 1).toUpperCase()}${this.name.slice(1)}`;
  }

  get generateInfo() {
    const dataObj = {
      name: this.generateName,
      img: this.img,
      id: this.id,
      abilities: this.getAbilities,
      types: this.getTypes,
      forms: this.getForms,
      stats: this.getStats,
      exp: this.exp,
      height: this.height,
    };

    return dataObj;
  }
}

export default PokemonPageInfoModel;

// const abbArr: string[] = abilities.map(
//   ({ ability: { name } }: { ability: { name: string } }) => {
//     return name;
//   }
// );
