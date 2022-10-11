import ViewSwitchEvent from 'src/composables/events/ViewSwitchEvent';
import { Subject } from 'rxjs';

describe('Test composable: ViewSwitchEvent', () => {
  it('Should export a Subject', () => {
    expect(ViewSwitchEvent).toBeDefined();
    expect(ViewSwitchEvent).toEqual(new Subject());
  });
});