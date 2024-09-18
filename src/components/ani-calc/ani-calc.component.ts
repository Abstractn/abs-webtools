import { AbsComponent } from 'abs-component';

export class AniCalc implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  init() {}
  ready() {}
}

/*
const config = {
  submitButtonNodeSelector: '[name="button-submit"]',
  submitButtonNode: null,
  startDateInputNode: null,
  startDateInputNodeSelector: '[name="input--start-date"]',
  durationInputNode: null,
  durationInputNodeSelector: '[name="input--duration"]',
  //alreadyAiredInputNode: null,
  //alreadyAiredInputNodeSelector: '[name="input--already-aired"]',
  watchStartDateOutputNode: null,
  watchStartDateOutputNodeSelector: '[name="output--watch"]',
  estimateEndDateOutputNode: null,
  estimateEndDateOutputNodeSelector: '[name="output--estimate"]',
  dataStorageKey: 'abs.anicalc.storedInputs',
};
const data = {
  startDate: null,
  duration: null,
  //alreadyAired: null
  watchStart: null,
  estimateEndDate: null,
};

function setNodesReferences() {
  config.submitButtonNode = document.querySelector(config.submitButtonNodeSelector);
  config.startDateInputNode = document.querySelector(config.startDateInputNodeSelector);
  config.durationInputNode = document.querySelector(config.durationInputNodeSelector);
  //config.alreadyAiredInputNode = document.querySelector(config.alreadyAiredInputNodeSelector);
  config.watchStartDateOutputNode = document.querySelector(config.watchStartDateOutputNodeSelector);
  config.estimateEndDateOutputNode = document.querySelector(config.estimateEndDateOutputNodeSelector);
}

function assignEvent() {
  config.submitButtonNode.addEventListener('click', (event) => {
    getData();
    storeData();
    calculateStart();
  });
}

function getData() {
  data.startDate = new Date(config.startDateInputNode.value);
  data.duration = config.durationInputNode.value * 1;
  //data.alreadyAired = config.alreadyAiredInputNode.value * 1;
}

function calculateStart() {
  const isValid = (
    data.startDate != 'Invalid Date' &&
    data.duration > 0
  );
  if (isValid) {
    //const endDate = dayjs(data.startDate).add(data.duration*7, 'day');
    //const resultDate = endDate.subtract(data.duration, 'day');
    const endDate = dayjs(data.startDate).add(data.duration - 1, 'week');
    const resultDate = endDate.subtract(data.duration - 1, 'day');
    config.watchStartDateOutputNode.value = resultDate.locale(navigator.language).format('MMMM DD');
    config.estimateEndDateOutputNode.value = endDate.locale(navigator.language).format('MMMM DD');
  } else {
    config.watchStartDateOutputNode.value = 'Error';
    config.estimateEndDateOutputNode.value = '';
  }
}

function storeData() {
  const storageData = {
    date: data.startDate,
    watchLength: data.duration,
  };
  localStorage.setItem(config.dataStorageKey, JSON.stringify(storageData));
}

function loadData() {
  const storedData = JSON.parse(localStorage.getItem(config.dataStorageKey));
  if (storedData) {
    config.startDateInputNode.value = dayjs(storedData.date).format('YYYY-MM-DD');
    config.durationInputNode.value = storedData.watchLength;
    data.startDate = storedData.date;
    data.duration = storedData.watchLength;
    calculateStart();
  }
}

function init() {
  setNodesReferences();
  assignEvent();
  loadData();
}

document.addEventListener('DOMContentLoaded', init);
*/