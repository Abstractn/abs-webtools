import { AbsComponent } from 'abs-component';
import Dayjs from 'dayjs';

interface AniCalcResult {
  endDate: Dayjs.Dayjs,
  watchDate: Dayjs.Dayjs,
}

export class AniCalc implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.startDateInputNode = this.node.getNode('[js-start]') as HTMLInputElement;
    this.durationInputNode = this.node.getNode('[js-duration]') as HTMLInputElement;
    this.releaseFrequencyInputNode = this.node.getNode('[js-release-frequency]') as HTMLInputElement;
    this.watchFrequencyInputNode = this.node.getNode('[js-watch-frequency]') as HTMLInputElement;
    this.watchDateInputNode = this.node.getNode('[js-result]') as HTMLInputElement;
    this.endDateInputNode = this.node.getNode('[js-end]') as HTMLInputElement;
    this.calculateButtonNode = this.node.getNode('[js-calculate]') as HTMLButtonElement;
  }

  private readonly ERROR_LABEL: string = 'Error';

  private readonly startDateInputNode: HTMLInputElement;
  private readonly durationInputNode: HTMLInputElement;
  private readonly releaseFrequencyInputNode: HTMLInputElement;
  private readonly watchFrequencyInputNode: HTMLInputElement;
  private readonly watchDateInputNode: HTMLInputElement;
  private readonly endDateInputNode: HTMLInputElement;
  private readonly calculateButtonNode: HTMLButtonElement;

  private calculate(startDate: Dayjs.Dayjs, duration: number): AniCalcResult | null {
    const isValid = (
      startDate.toString() != 'Invalid Date' &&
      duration > 0
    );
    if (isValid) {
      const endDate = Dayjs(startDate).add(duration - 1, 'week');
      const watchDate = endDate.subtract(duration - 1, 'day');
      return {
        endDate: endDate,
        watchDate: watchDate,
      };
    } else {
      return null;
    }
  }

  private setEvents() {
    this.calculateButtonNode.addEventListener('click', () => {
      const startDate = Dayjs(this.startDateInputNode.value);
      const duration = parseInt(this.durationInputNode.value);
      const res = this.calculate(startDate, duration);
      if(res) {
        //this.watchDateInputNode.value = res.watchDate.locale(navigator.language).format('MMMM DD');
        //this.endDateInputNode.value = res.endDate.locale(navigator.language).format('MMMM DD');
        this.watchDateInputNode.value = res.watchDate.format('MMMM DD');
        this.endDateInputNode.value = res.endDate.format('MMMM DD');
      } else {
        this.watchDateInputNode.value = this.ERROR_LABEL;
        this.endDateInputNode.value = '';
      }
    });
  }

  init() {
    this.setEvents();
  }

  ready() {}
}