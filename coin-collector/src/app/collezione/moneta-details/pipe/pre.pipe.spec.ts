import { PrePipe } from './pre.pipe';

describe('PrePipe', () => {
  it('create an instance', () => {
    const pipe = new PrePipe();
    expect(pipe).toBeTruthy();
  });
});
