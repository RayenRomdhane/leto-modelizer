import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import GitPushForm from 'src/components/form/GitPushForm.vue';
import { Notify } from 'quasar';

installQuasarPlugin({
  plugins: [Notify],
});

jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (t) => t,
  }),
}));

jest.mock('src/composables/Project', () => ({
  getProjectById: jest.fn((id) => ({
    id,
    git: {
      username: 'username',
      token: 'token',
    },
  })),
  gitPush: jest.fn((project) => {
    if (project.id === 'error') {
      return Promise.reject({ name: 'error' });
    }
    return Promise.resolve();
  }),
}));

describe('Test component: GitPushForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GitPushForm, {
      props: {
        projectName: 'test',
        branchName: 'test',
      },
    });
  });

  describe('Test variables initialization', () => {
    describe('Test props: projectName', () => {
      it('should match "test"', () => {
        expect(wrapper.vm.props.projectName).toEqual('test');
      });
    });

    describe('Test props: branchName', () => {
      it('should match "test"', () => {
        expect(wrapper.vm.props.branchName).toEqual('test');
      });
    });
  });

  describe('Test function: onSubmit', () => {
    it('should emit "git-branch:push" and a notification on success', async () => {
      Notify.create = jest.fn();

      await wrapper.vm.onSubmit();

      expect(wrapper.vm.submitting).toEqual(false);
      expect(wrapper.emitted()['git-branch:push']).toBeTruthy();
      expect(Notify.create).toHaveBeenCalledWith(expect.objectContaining({ type: 'positive' }));
    });

    it('should emit a notification on error', async () => {
      wrapper = shallowMount(GitPushForm, {
        props: {
          projectName: 'error',
          branchName: 'test',
        },
      });
      Notify.create = jest.fn();

      await wrapper.vm.onSubmit();

      expect(Notify.create).toHaveBeenCalledWith(expect.objectContaining({ type: 'negative' }));
    });
  });
});
