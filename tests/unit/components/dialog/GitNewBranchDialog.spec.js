import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import i18nConfiguration from 'src/i18n';
import GitNewBranchDialog from 'src/components/dialog/GitNewBranchDialog.vue';
import DialogEvent from 'src/composables/events/DialogEvent';

installQuasarPlugin();

jest.mock('src/composables/events/DialogEvent', () => ({
  subscribe: jest.fn(),
}));

describe('Test component: GitNewBranchDialog', () => {
  let wrapper;
  let subscribe;
  let unsubscribe;

  beforeEach(() => {
    subscribe = jest.fn();
    unsubscribe = jest.fn();

    DialogEvent.subscribe.mockImplementation(() => {
      subscribe();
      return { unsubscribe };
    });

    wrapper = shallowMount(GitNewBranchDialog, {
      props: {
        dialogKey: 'test',
        projectName: 'test',
      },
      global: {
        plugins: [
          createI18n({ locale: 'en-US', messages: i18nConfiguration }),
        ],
      },
    });
  });

  describe('Test functions', () => {
    describe('Test function: setBranchName', () => {
      it('should set branch name on valid event type', () => {
        expect(wrapper.vm.branchName).toBeNull();

        wrapper.vm.setBranchName({ key: 'GitNewBranch', branch: 'test' });
        expect(wrapper.vm.branchName).toEqual('test');
      });

      it('should not set branch name on invalid event type', () => {
        expect(wrapper.vm.branchName).toBeNull();

        wrapper.vm.setBranchName({ key: 'InvalidEvent', branch: 'test' });
        expect(wrapper.vm.branchName).toBeNull();
      });
    });
  });

  describe('Test hook function: onMounted', () => {
    it('should subscribe DialogEvent', () => {
      expect(subscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test hook function: onUnmounted', () => {
    it('should unsubscribe DialogEvent', () => {
      expect(unsubscribe).toHaveBeenCalledTimes(0);
      wrapper.unmount();
      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});
