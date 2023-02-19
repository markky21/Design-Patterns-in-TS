interface EquipmentComponentMeta {
  name: string;
  power: number;
  netPrice: number;
  discountPrice: number;
}

abstract class ComponentEquipment {
  protected readonly children: ComponentEquipment[] = [];

  constructor(protected readonly meta: EquipmentComponentMeta) {}

  add(equipment: ComponentEquipment): void {
    throw new Error("Cannot add to a leaf");
  }
  remove(equipment: ComponentEquipment): void {
    throw new Error("Cannot remove from a leaf");
  }

  protected getChild(index: number): ComponentEquipment {
    return this.children[index];
  }

  getName(): string {
    return this.meta.name;
  }

  getPower(): number {
    return this.meta.power;
  }

  getNetPrice(): number {
    return this.meta.netPrice;
  }

  getDiscountPrice(): number {
    return this.meta.discountPrice;
  }
}

abstract class CompositeEquipment extends ComponentEquipment {
  add(equipment: ComponentEquipment): void {
    this.children.push(equipment);
  }

  remove(equipment: ComponentEquipment): void {
    const equipmentIndex = this.children.indexOf(equipment);
    this.children.splice(equipmentIndex, 1);
  }

  getNetPrice(): number {
    return this.children.reduce(
      (total, child) => total + child.getNetPrice(),
      super.getNetPrice()
    );
  }

  getDiscountPrice(): number {
    return this.children.reduce(
      (total, child) => total + child.getDiscountPrice(),
      super.getDiscountPrice()
    );
  }

  getPower(): number {
    return this.children.reduce(
      (total, child) => total + child.getPower(),
      super.getPower()
    );
  }
}

/**
 * Concrete Components
 */

class FloppyDisk extends ComponentEquipment {
  constructor() {
    super({
      name: "Floppy Disk",
      power: 0.5,
      netPrice: 70,
      discountPrice: 65,
    });
  }
}

class Chassis extends CompositeEquipment {
  constructor() {
    super({
      name: "Chassis",
      power: 0,
      netPrice: 40,
      discountPrice: 0,
    });
  }
}

class Cabinet extends CompositeEquipment {
  constructor() {
    super({
      name: "Cabinet",
      power: 0,
      netPrice: 20,
      discountPrice: 0,
    });
  }
}

/**
 * Usage
 */

const cabinet = new Cabinet();
const chassis = new Chassis();
const floppyDisk = new FloppyDisk();

cabinet.add(chassis);
chassis.add(floppyDisk);

console.log(`Net cost: ${cabinet.getNetPrice()}`);

chassis.remove(floppyDisk);
console.log(`Net cost: ${cabinet.getNetPrice()}`);
