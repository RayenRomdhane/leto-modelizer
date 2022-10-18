import Branch from 'src/models/git/Branch';

describe('Test class: Branch', () => {
  describe('Test constructor', () => {
    it('should use default values when called with no parameter', () => {
      const branch = new Branch();

      expect(branch.name).toBeNull();
      expect(branch.onLocal).toEqual(false);
      expect(branch.onRemote).toEqual(false);
      expect(branch.isCurrentBranch).toEqual(false);
      expect(branch.remote).toEqual('origin');
    });

    it('should use default values when called with an empty object', () => {
      const branch = new Branch({});

      expect(branch.name).toBeNull();
      expect(branch.onLocal).toEqual(false);
      expect(branch.onRemote).toEqual(false);
      expect(branch.isCurrentBranch).toEqual(false);
      expect(branch.remote).toEqual('origin');
    });

    it('should use values from the parameter object', () => {
      const branch = new Branch({
        name: 'name',
        onLocal: true,
        onRemote: true,
        isCurrentBranch: true,
        remote: 'test',
      });

      expect(branch.name).toEqual('name');
      expect(branch.onLocal).toEqual(true);
      expect(branch.onRemote).toEqual(true);
      expect(branch.isCurrentBranch).toEqual(true);
      expect(branch.remote).toEqual('test');
    });
  });

  describe('Test getters', () => {
    describe('Test getter: fullName', () => {
      it('should return string with valid remote', () => {
        const branch = new Branch({
          name: 'name',
          onLocal: true,
          onRemote: true,
        });
        expect(branch.fullName).toEqual('origin/name');
      });
      it('should return empty string with no remote', () => {
        const branch = new Branch({
          name: 'name',
          onLocal: true,
          onRemote: false,
        });
        expect(branch.fullName).toEqual('');
      });
    });
  });

  describe('Test functions', () => {
    describe('Test function: compare', () => {
      it('should display current branch before other branches', () => {
        const currentBranch = new Branch({ isCurrentBranch: true });
        const otherBranch = new Branch({ isCurrentBranch: false });
        expect(currentBranch.compare(otherBranch)).toEqual(-1);
        expect(otherBranch.compare(currentBranch)).toEqual(1);
      });

      it('should compare branches in alphabetical order', () => {
        const currentBranch = new Branch({ name: 'a' });
        const otherBranch = new Branch({ name: 'b' });

        expect(currentBranch.compare(currentBranch)).toEqual(0);
        expect(currentBranch.compare(otherBranch)).toEqual(-1);
        expect(otherBranch.compare(currentBranch)).toEqual(1);
      });
    });
  });
});
