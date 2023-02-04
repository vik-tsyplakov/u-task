import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css'],
})
export class PasswordStrengthComponent implements OnChanges {
  bar0: string = 'darkred';
  bar1: string = 'darkred';
  bar2: string = 'darkred';

  @Input() public passwordToCheck: string = '';

  @Output() passwordStrength = new EventEmitter<boolean>();

  private colors = ['red', 'Gold', 'green'];

  message: string = '';
  messageColor: string = '';

  checkStrength(password: string) {
    let force = 0;

    // 2
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const letters = /[a-zA-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);

    const flags = [letters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    force += 2 * password.length + (password.length >= 10 ? 1 : 0);
    force += passedMatches * 10;

    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;

    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;

    this.setBarColors(3, '#DDD');

    if (password) {
      const pwdStrength = this.checkStrength(password);
      const color = this.getColor(pwdStrength);
      if (password.length < 8) {
        this.setBarColors(3, 'red');
        this.message = 'Should contain more than 8 symbols';
        this.messageColor = 'red';
        return;
      } else {
        this.setBarColors(color.index, color.color);
      }

      pwdStrength === 30
        ? this.passwordStrength.emit(true)
        : this.passwordStrength.emit(false);

      switch (pwdStrength) {
        case 10:
          this.message = 'Easy';
          break;
        case 20:
          this.message = 'Medium';
          break;
        case 30:
          this.message = 'Strong';
          break;
      }
    } else {
      this.message = '';
    }
  }

  private getColor(strength: number) {
    let index;

    if (strength === 10) {
      index = 0;
    } else if (strength === 20) {
      index = 1;
    } else if (strength === 30) {
      index = 2;
    } else {
      index = 4;
    }

    this.messageColor = this.colors[index];

    return {
      index: index + 1,
      color: this.colors[index],
    };
  }

  private setBarColors(count: number, color: string) {
    for (let i = 0; i < count; i++) {
      (this as any)['bar' + i] = color;
    }
  }
}
