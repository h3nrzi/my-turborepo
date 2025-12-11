export class EmailVO {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(email: string): EmailVO {
    const normalized = email.trim();
    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new Error('Invalid email');
    }
    return new EmailVO(normalized.toLowerCase());
  }
}
