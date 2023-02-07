import {
  notEmpty,
  isGitRepositoryUrl,
  isUniqueBranchName,
  isValidFileLabel,
  isUniqueFileLabel,
  isRequired,
  isStringTooShort,
  isStringTooLong,
  isStringMatchingRegExp,
  isNumberTooSmall,
  isNumberTooBig,
} from 'src/composables/QuasarFieldRule';

describe('Test composable: InputRule', () => {
  const t = (key) => key;

  describe('Test function: notEmpty', () => {
    it('should return true if not empty', () => {
      expect(notEmpty(t, 'a')).toBeTruthy();
    });

    it('should return error if undefined', () => {
      expect(notEmpty(t)).toEqual('errors.empty');
    });

    it('should return error if null', () => {
      expect(notEmpty(t, null)).toEqual('errors.empty');
    });

    it('should return error if empty', () => {
      expect(notEmpty(t, '')).toEqual('errors.empty');
    });
  });

  describe('Test function: isGitRepositoryUrl', () => {
    it('should return true on valid git url', () => {
      expect(isGitRepositoryUrl(t, 'http://test.com/test')).toBe(true);
      expect(isGitRepositoryUrl(t, 'https://test.com/test')).toBe(true);
      expect(isGitRepositoryUrl(t, 'https://github.com/ditrit/leto-modelizer')).toBe(true);
    });

    it('should return error on invalid git url', () => {
      const key = 'errors.invalid.gitAddRemote.repository';
      expect(isGitRepositoryUrl(t, 'git@github.com/ditrit/leto-modelizer.git')).toEqual(key);
      expect(isGitRepositoryUrl(t, 'ftp://github.com/ditrit/leto-modelizer.git')).toEqual(key);
      expect(isGitRepositoryUrl(t, 'http://github.com/ditrit/leto-modelizer.git')).toEqual(key);
    });
  });

  describe('Test function: isUniqueBranchName', () => {
    it('should return true without duplicated branch', () => {
      expect(isUniqueBranchName(t, [], 'test')).toBe(true);
      expect(isUniqueBranchName(t, [{ name: 'test2' }], 'test')).toBe(true);
    });

    it('should return string error message with duplicated branch', () => {
      const key = 'errors.git.branch.duplicate';
      expect(isUniqueBranchName(t, [{ name: 'test' }], 'test')).toEqual(key);
    });
  });

  describe('Test function: isValidFileLabel', () => {
    it('should return true on valid tree node label', () => {
      expect(isValidFileLabel(t, 'folderName')).toBe(true);
      expect(isValidFileLabel(t, 'app.tf')).toBe(true);
      expect(isValidFileLabel(t, 'my-file.tf')).toBe(true);
    });

    it('should return string error message on invalid tree node label', () => {
      const key = 'errors.invalid.fileExplorer.label';
      expect(isValidFileLabel(t, '/folderName')).toEqual(key);
      expect(isValidFileLabel(t, 'app/file.tf')).toEqual(key);
      expect(isValidFileLabel(t, 'folder/app.tf')).toEqual(key);
    });
  });

  describe('Test function: isUniqueFileLabel', () => {
    it('should return true without duplicated node label', () => {
      expect(isUniqueFileLabel(t, [], 'fileName')).toBe(true);
      expect(isUniqueFileLabel(t, [{ label: 'app.tf' }], 'fileName')).toBe(true);
      expect(isUniqueFileLabel(t, [{ label: 'folderA' }], 'folderB')).toBe(true);
    });

    it('should return string error message with duplicated node label', () => {
      const key = 'errors.fileExplorer.label.duplicate';
      expect(isUniqueFileLabel(t, [{ label: 'test' }], 'test')).toEqual(key);
    });
  });

  describe('Test function: isRequired', () => {
    const key = 'errors.rules.required';

    it('should return true', () => {
      expect(isRequired(null, null, undefined)).toBe(true);
      expect(isRequired(null, true, true)).toBe(true);
    });

    it('should return string error message', () => {
      expect(isRequired(t, null, true)).toEqual(key);
      expect(isRequired(t, undefined, true)).toEqual(key);
    });

    it('should return true on valid boolean', () => {
      expect(isRequired(t, true, true)).toEqual(true);
      expect(isRequired(t, false, true)).toEqual(true);
    });

    it('should return string error message on empty array', () => {
      expect(isRequired(t, [], true)).toEqual(key);
    });

    it('should return true on not empty array', () => {
      expect(isRequired(t, [1], true)).toEqual(true);
    });
  });

  describe('Test function: isStringTooShort', () => {
    it('should return true', () => {
      expect(isStringTooShort(null, null, undefined)).toBe(true);
      expect(isStringTooShort(null, 'yes', 3)).toBe(true);
    });

    it('should return string error message', () => {
      const key = 'errors.rules.string.min';
      expect(isStringTooShort(t, 'no', 3)).toEqual(key);
    });
  });

  describe('Test function: isStringTooLong', () => {
    it('should return true', () => {
      expect(isStringTooLong(null, null, undefined)).toBe(true);
      expect(isStringTooLong(null, 'yes', 3)).toBe(true);
    });

    it('should return string error message', () => {
      const key = 'errors.rules.string.max';
      expect(isStringTooLong(t, 'nono', 3)).toEqual(key);
    });
  });

  describe('Test function: isStringMatchingRegExp', () => {
    it('should return true', () => {
      expect(isStringMatchingRegExp(null, null, undefined)).toBe(true);
      expect(isStringMatchingRegExp(null, 'abcd', '^[a-z]{3,}$')).toBe(true);
    });

    it('should return string error message', () => {
      const key = 'errors.rules.string.regexp';
      expect(isStringMatchingRegExp(t, 'a', '^[a-z]{3,}$')).toEqual(key);
    });
  });

  describe('Test function: isNumberTooSmall', () => {
    it('should return true', () => {
      expect(isNumberTooSmall(null, null, undefined)).toBe(true);
      expect(isNumberTooSmall(null, 3, 3)).toBe(true);
    });

    it('should return string error message', () => {
      const key = 'errors.rules.number.min';
      expect(isNumberTooSmall(t, 2, 3)).toEqual(key);
    });
  });

  describe('Test function: isNumberTooBig', () => {
    it('should return true', () => {
      expect(isNumberTooBig(null, null, undefined)).toBe(true);
      expect(isNumberTooBig(null, 3, 3)).toBe(true);
    });

    it('should return string error message', () => {
      const key = 'errors.rules.number.max';
      expect(isNumberTooBig(t, 4, 3)).toEqual(key);
    });
  });
});
