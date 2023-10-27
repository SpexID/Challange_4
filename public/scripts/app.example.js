class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.inputElement = document.getElementById("input_jumlah");
    this.dateInputElement = document.getElementById("date");
    this.transmissionInput = document.getElementById("mySelect1")
    this.availableInput = document.getElementById("mySelect2")

  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  
    // Disable the load button initially
    this.loadButton.disabled = true;
  
    // Add event listeners to required input fields
    this.transmissionInput.addEventListener('input', this.toggleLoadButton);
    this.dateInputElement.addEventListener('input', this.toggleLoadButton);
    this.availableInput.addEventListener('input', this.toggleLoadButton);
  }

  toggleLoadButton = () => {
    const selectedTransmission = this.transmissionInput.value;
    const selectedDate = this.dateInputElement.value;
    const selectedAvailability = this.availableInput.value;
  
    if (selectedTransmission && selectedDate && selectedAvailability) {
      this.loadButton.disabled = false;
    } else {
      this.loadButton.disabled = true;
    }
  };
  
  run = () => {
    event.preventDefault();
    const selectedTransmission = this.transmissionInput.value;
    const selectedDate = new Date(this.dateInputElement.value);
    const selectedAvailability = this.availableInput.value;
    const desiredCapacity = this.inputElement.value ? parseInt(this.inputElement.value) : null;
  
    const carsToShow = Car.list.filter((car) => {
      if (desiredCapacity !== null) {
        return (
          car.capacity === desiredCapacity &&
          car.availableAt < selectedDate &&
          car.transmission === selectedTransmission &&
          car.available === (selectedAvailability === "true")
        );
      } else {
        return (
          car.availableAt < selectedDate &&
          car.transmission === selectedTransmission &&
          car.available === (selectedAvailability === "true")
        );
      }
    });
  
    this.clear();

    carsToShow.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      node.classList.add("car-item");
      node.classList.add("container");
      // node.classList.add("grid");
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
