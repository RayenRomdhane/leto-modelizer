import { getTree } from 'src/composables/FileExplorer';
import { isParsableFile } from 'src/composables/PluginManager';

jest.mock('src/composables/PluginManager', () => ({
  isParsableFile: jest.fn(() => false),
}));

describe('Test composable: FileExplorer', () => {
  describe('Test function: getTree', () => {
    it('should manage one root file', () => {
      const input = [{ path: 'file.tf' }];
      const tree = getTree('my-project', input);
      const output = [
        {
          id: 'my-project',
          icon: 'fa-solid fa-folder',
          label: 'my-project',
          isFolder: true,
          isRootFolder: true,
          children: [
            {
              id: 'file.tf',
              label: 'file.tf',
              icon: 'fa-regular fa-file',
              isFolder: false,
              information: { path: 'file.tf' },
              isParsable: false,
            },
          ],
        }];

      expect(tree).toStrictEqual(output);
    });

    it('should manage two root files', () => {
      const input = [{ path: 'file1.tf' }, { path: 'file2.tf' }];
      const tree = getTree('my-project', input);
      const output = [
        {
          id: 'my-project',
          icon: 'fa-solid fa-folder',
          label: 'my-project',
          isFolder: true,
          isRootFolder: true,
          children: [
            {
              id: 'file1.tf',
              label: 'file1.tf',
              icon: 'fa-regular fa-file',
              isFolder: false,
              information: { path: 'file1.tf' },
              isParsable: false,
            },
            {
              id: 'file2.tf',
              label: 'file2.tf',
              icon: 'fa-regular fa-file',
              isFolder: false,
              information: { path: 'file2.tf' },
              isParsable: false,
            },
          ],
        }];

      expect(tree).toStrictEqual(output);
    });

    it('should manage one file in one folder', () => {
      const input = [{ path: 'home/file.tf' }];
      const tree = getTree('my-project', input);
      const output = [
        {
          id: 'my-project',
          icon: 'fa-solid fa-folder',
          label: 'my-project',
          isFolder: true,
          isRootFolder: true,
          children: [
            {
              id: 'home',
              icon: 'fa-solid fa-folder',
              label: 'home',
              isFolder: true,
              hasParsableFiles: false,
              children: [
                {
                  id: 'home/file.tf',
                  label: 'file.tf',
                  icon: 'fa-regular fa-file',
                  isFolder: false,
                  information: { path: 'home/file.tf' },
                  isParsable: false,
                },
              ],
            },
          ],
        }];

      expect(tree).toStrictEqual(output);
    });

    it('should manage two files in one folder', () => {
      const input = [{ path: 'home/file1.tf' }, { path: 'home/file2.tf' }];
      const tree = getTree('my-project', input);
      const output = [
        {
          id: 'my-project',
          icon: 'fa-solid fa-folder',
          label: 'my-project',
          isFolder: true,
          isRootFolder: true,
          children: [
            {
              id: 'home',
              icon: 'fa-solid fa-folder',
              label: 'home',
              isFolder: true,
              hasParsableFiles: false,
              children: [
                {
                  id: 'home/file1.tf',
                  label: 'file1.tf',
                  icon: 'fa-regular fa-file',
                  isFolder: false,
                  information: { path: 'home/file1.tf' },
                  isParsable: false,
                },
                {
                  id: 'home/file2.tf',
                  label: 'file2.tf',
                  icon: 'fa-regular fa-file',
                  isFolder: false,
                  information: { path: 'home/file2.tf' },
                  isParsable: false,
                },
              ],
            },
          ],
        }];

      expect(tree).toStrictEqual(output);
    });

    it('should manage multiple files in multiple folders', () => {
      const input = [
        { path: 'user/plugin/file3.tf' },
        { path: 'home/folderA/file2.tf' },
        { path: 'home/folderA/subFolder/file1.tf' },
      ];
      const tree = getTree('my-project', input);
      const output = [
        {
          id: 'my-project',
          icon: 'fa-solid fa-folder',
          label: 'my-project',
          isFolder: true,
          isRootFolder: true,
          children: [
            {
              id: 'home',
              icon: 'fa-solid fa-folder',
              label: 'home',
              isFolder: true,
              hasParsableFiles: false,
              children: [
                {
                  id: 'home/folderA',
                  label: 'folderA',
                  icon: 'fa-solid fa-folder',
                  isFolder: true,
                  hasParsableFiles: false,
                  children: [
                    {
                      id: 'home/folderA/subFolder',
                      label: 'subFolder',
                      icon: 'fa-solid fa-folder',
                      isFolder: true,
                      hasParsableFiles: false,
                      children: [
                        {
                          id: 'home/folderA/subFolder/file1.tf',
                          label: 'file1.tf',
                          icon: 'fa-regular fa-file',
                          isFolder: false,
                          information: { path: 'home/folderA/subFolder/file1.tf' },
                          isParsable: false,
                        },
                      ],
                    },
                    {
                      id: 'home/folderA/file2.tf',
                      label: 'file2.tf',
                      icon: 'fa-regular fa-file',
                      isFolder: false,
                      information: { path: 'home/folderA/file2.tf' },
                      isParsable: false,
                    },
                  ],
                },
              ],
            },
            {
              id: 'user',
              icon: 'fa-solid fa-folder',
              label: 'user',
              isFolder: true,
              hasParsableFiles: false,
              children: [
                {
                  id: 'user/plugin',
                  label: 'plugin',
                  icon: 'fa-solid fa-folder',
                  isFolder: true,
                  hasParsableFiles: false,
                  children: [
                    {
                      id: 'user/plugin/file3.tf',
                      label: 'file3.tf',
                      icon: 'fa-regular fa-file',
                      isFolder: false,
                      information: { path: 'user/plugin/file3.tf' },
                      isParsable: false,
                    },
                  ],
                },
              ],
            },
          ],
        }];

      expect(tree).toStrictEqual(output);
    });

    it('should manage one parsable file', () => {
      isParsableFile.mockImplementation(() => true);

      const input = [{ path: 'home/file.tf' }];
      const tree = getTree('my-project', input);
      const output = [
        {
          id: 'my-project',
          icon: 'fa-solid fa-folder',
          label: 'my-project',
          isFolder: true,
          isRootFolder: true,
          children: [
            {
              id: 'home',
              icon: 'fa-solid fa-folder',
              label: 'home',
              isFolder: true,
              hasParsableFiles: true,
              children: [
                {
                  id: 'home/file.tf',
                  label: 'file.tf',
                  icon: 'fa-regular fa-file',
                  isFolder: false,
                  information: { path: 'home/file.tf' },
                  isParsable: true,
                },
              ],
            },
          ],
        }];

      expect(tree).toStrictEqual(output);
    });

    it('should manage two parsable files', () => {
      isParsableFile.mockImplementation(({ path }) => path === 'home/file.tf' || path === 'user/file.tf');

      const input = [{ path: 'home/file.tf' }, { path: 'user/file.tf' }, { path: 'README.md' }];
      const tree = getTree('my-project', input);
      const output = [
        {
          id: 'my-project',
          icon: 'fa-solid fa-folder',
          label: 'my-project',
          isFolder: true,
          isRootFolder: true,
          children: [
            {
              id: 'home',
              icon: 'fa-solid fa-folder',
              label: 'home',
              isFolder: true,
              hasParsableFiles: true,
              children: [
                {
                  id: 'home/file.tf',
                  label: 'file.tf',
                  icon: 'fa-regular fa-file',
                  isFolder: false,
                  information: { path: 'home/file.tf' },
                  isParsable: true,
                },
              ],
            },
            {
              id: 'user',
              icon: 'fa-solid fa-folder',
              label: 'user',
              isFolder: true,
              hasParsableFiles: true,
              children: [
                {
                  id: 'user/file.tf',
                  label: 'file.tf',
                  icon: 'fa-regular fa-file',
                  isFolder: false,
                  information: { path: 'user/file.tf' },
                  isParsable: true,
                },
              ],
            },
            {
              id: 'README.md',
              label: 'README.md',
              icon: 'fa-regular fa-file',
              isFolder: false,
              information: { path: 'README.md' },
              isParsable: false,
            },
          ],
        }];

      expect(tree).toStrictEqual(output);
    });

    it('should manage empty tree', () => {
      expect(getTree('my-project', [])).toStrictEqual([{
        id: 'my-project',
        icon: 'fa-solid fa-folder',
        label: 'my-project',
        isFolder: true,
        isRootFolder: true,
        children: [],
      }]);
    });
  });
});
