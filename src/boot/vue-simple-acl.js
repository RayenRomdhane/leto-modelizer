import { boot } from 'quasar/wrappers';
import { createAcl, defineAclRules } from 'vue-simple-acl';
import { computed } from 'vue';
import { useUserStore } from 'stores/UserStore';

const userStore = useUserStore();
const userRoles = computed(() => ({ roles: userStore.roles }));
const rules = () => defineAclRules((setRule) => {
  setRule('admin', (user) => process.env.HAS_BACKEND && process.env.ADMIN_URL && user.roles.includes('admin'));
  setRule('create-diagram', (user) => !process.env.HAS_BACKEND || user.roles.includes('CF_createDiagram'));
  setRule('create-diagram-from-template', (user) => !process.env.HAS_BACKEND || user.roles.includes('CF_createDiagramFromTemplate'));
  setRule('create-component', (user) => !process.env.HAS_BACKEND || user.roles.includes('CF_createComponent'));
  setRule('create-component-from-template', (user) => !process.env.HAS_BACKEND || user.roles.includes('CF_createComponentFromTemplate'));
  setRule('create-project', (user) => !process.env.HAS_BACKEND || user.roles.includes('CF_createProject'));
  setRule('create-project-from-template', (user) => !process.env.HAS_BACKEND || user.roles.includes('CF_createProjectFromTemplate'));
  setRule('delete-diagram', (user) => !process.env.HAS_BACKEND || user.roles.includes('CF_deleteDiagram'));
});

export default boot(({ app }) => {
  app.use(createAcl({
    user: userRoles,
    rules,
    disabledAttrTitle: 'Custom Disabled Title',
  }));
});
