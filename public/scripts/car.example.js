class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
    <img src="${this.image}" class="card-img-top" alt="${this.manufacture}" style="width:100%">
      <p>Nama/Tipe Mobil</p>
      <p><b>Rp. ${this.rentPerDay}/hari</b></p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      <p>${this.capacity} orang</p>
      <p>${this.transmission}</p>
      <p>Tahun ${this.year}</p>
      <button class="btn btn-success" id="btn-pilih">Pilih mobil</button>
    `;
  }
}
