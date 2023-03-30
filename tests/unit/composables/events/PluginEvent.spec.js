import PluginEvent from 'src/composables/events/PluginEvent';
import { Subject } from 'rxjs';

describe('Test composable: PluginEvent', () => {
  describe('Test event: InitEvent', () => {
    it('should export a Subject', () => {
      expect(PluginEvent.InitEvent).toBeDefined();
      expect(PluginEvent.InitEvent).toEqual(new Subject());
    });
  });

  describe('Test event: EditEvent', () => {
    it('should export a Subject', () => {
      expect(PluginEvent.EditEvent).toBeDefined();
      expect(PluginEvent.EditEvent).toEqual(new Subject());
    });
  });

  describe('Test event: UpdateEvent', () => {
    it('should export a Subject', () => {
      expect(PluginEvent.UpdateEvent).toBeDefined();
      expect(PluginEvent.UpdateEvent).toEqual(new Subject());
    });
  });
});
