import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestSignUp } from '../utils/auth.util';
import { InputItem } from '../components/signup/InputItem';
import { HalfWidthButton as Button } from '../components/common/HalfWidthButton';

function validatePassword(password: string): boolean {
  if (password.length < 10) return false;

  let [hasUpper, hasLower, hasDigit] = [false, false, false];

  for (let i = 0; i < password.length; i++) {
    const code = password.charCodeAt(i);
    hasUpper ||= 65 <= code && code <= 90;
    hasLower ||= 97 <= code && code <= 122;
    hasDigit ||= 48 <= code && code <= 57;
  }

  return hasUpper && hasLower && hasDigit;
}

export function SignUp() {
  const navigate = useNavigate();

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const termsCheckboxRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const passwordWarningEl = document.getElementById('password_warning')!;
    const passwordConfirmWarningEl = document.getElementById('password_confirm_warning')!;

    // 비밀번호 입력란 경고 메시지 로직 추가하기
    passwordRef.current?.addEventListener('input', () => {
      const [passwordInput, passwordConfirmInput] = [
        passwordRef.current!,
        passwordConfirmRef.current!,
      ];
      passwordWarningEl.style.visibility =
        passwordInput.value && !validatePassword(passwordInput.value) ? 'visible' : 'hidden';
      passwordConfirmWarningEl.style.visibility =
        passwordConfirmInput.value && passwordInput.value !== passwordConfirmInput.value
          ? 'visible'
          : 'hidden';
    });

    // 비밀번호 확인 입력란 경고 메시지 로직 추가하기
    passwordConfirmRef.current?.addEventListener('input', () => {
      const [passwordInput, passwordConfirmInput] = [
        passwordRef.current!,
        passwordConfirmRef.current!,
      ];
      passwordConfirmWarningEl.style.visibility =
        passwordConfirmInput.value && passwordInput.value !== passwordConfirmInput.value
          ? 'visible'
          : 'hidden';
    });
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const [passwordInput, passwordConfirmInput] = [
      passwordRef.current!,
      passwordConfirmRef.current!,
    ];

    // 비밀번호 입력란 유효성 검사하기
    if (!validatePassword(passwordInput.value)) {
      passwordInput.focus();
      passwordConfirmInput.value = '';
      document.getElementById('password_confirm_warning')!.style.visibility = 'hidden';
      return;
    }

    // 비밀번호 확인 입력란 유효성 검사하기
    if (passwordInput.value !== passwordConfirmInput.value) {
      passwordConfirmInput.focus();
      return;
    }

    // 약관 확인 항목 유효성 검사하기
    if (!termsCheckboxRef.current!.checked) {
      return;
    }

    if (requestSignUp() === 'success') {
      navigate('/');
    } else {
      // TODO: 에러 메시지 표시하기
    }
  }

  return (
    <div className="px-10 py-16 bg-primary-400 min-h-full">
      {/* 제목 */}
      <h1 className="text-slate-50 text-5xl font-medium">이메일 회원가입</h1>
      <form className="mt-16" method="post" onSubmit={handleSubmit}>
        {/* 이메일 입력란 */}
        <InputItem required type="email" margin="mr-24" name="email" title="이메일" />
        {/* 비밀번호 입력란 */}
        <div className="mt-11 flex">
          <InputItem ref={passwordRef} required type="password" name="password" title="비밀번호" />
          <p
            id="password_warning"
            className="ml-4 w-5/12 text-red-400 font-medium leading-snug invisible"
          >
            <br />
            <br />ⓘ 영문 대소문자 및 숫자를 모두 포함한 10자리 이상의 문자열을 입력해주세요.
          </p>
        </div>
        {/* 비밀번호 확인 입력란 */}
        <div className="mt-3.5 flex">
          <InputItem
            ref={passwordConfirmRef}
            type="password"
            name="passwordConfirm"
            title="비밀번호 확인"
          />
          <p
            id="password_confirm_warning"
            className="ml-4 w-5/12 text-red-400 font-medium leading-snug invisible"
          >
            <br />
            <br />ⓘ 입력하신 비밀번호가 일치하지 않습니다.
          </p>
        </div>
        {/* 약관 확인 */}
        <section className="mr-24 mt-11">
          <h1 className="my-2 text-primary-100 text-lg">약관 확인</h1>
          <textarea
            className="p-3.5 w-full text-gray-700 rounded-2xl border-2 border-primary-200 resize-none"
            rows={7}
            readOnly
          >
            약관 내용
          </textarea>
          <label className="mt-1 flex items-center">
            <input ref={termsCheckboxRef} type="checkbox" name="isTermsAgreed" />
            <p className="ml-1.5 text-primary-100">
              위 약관을 전부 이해하였으며, 상기 모든 내용에 동의합니다.
            </p>
          </label>
        </section>
        <Button type="submit" margin="mt-10" bgColor="bg-slate-200" textColor="text-slate-600">
          다음 단계로
        </Button>
      </form>
    </div>
  );
}
