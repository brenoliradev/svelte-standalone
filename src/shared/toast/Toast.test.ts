import { render, fireEvent } from '@testing-library/svelte';
import Toast from '@/shared/toast/Toast.test.svelte';

import { describe, expect, test, vi } from 'vitest';

import { dismissToast } from './store';

vi.mock('./store', () => ({
  dismissToast: vi.fn(),
}));

describe('Toast Component', () => {
  test('renders success toast', () => {
    const { getByText, container } = render(Toast, {
      props: {
        type: 'success',
        dismissible: true,
        message: "success message"
      }
    });

    expect(container.querySelector('svg.stroke-green-700')).toBeInTheDocument();
    expect(getByText('success message')).toBeInTheDocument();
  });

  test('renders error toast', () => {
    const { getByText, container } = render(Toast, {
      props: {
        type: 'error',
        dismissible: true,
        message: "error message"
      },
    });

    expect(container.querySelector('svg.fill-red-700')).toBeInTheDocument();
    expect(getByText('error message')).toBeInTheDocument();
  });

  test('renders info toast', () => {
    const { getByText, container } = render(Toast, {
      props: {
        type: 'info',
        dismissible: true,
        message: "info message"
      },
    });

    expect(container.querySelector('svg.fill-yellow-600')).toBeInTheDocument();
    expect(getByText('info message')).toBeInTheDocument();
  });

  test('renders and dismisses toast on button click', async () => {
    const { getByText, getByRole } = render(Toast, {
      props: {
        type: 'error',
        dismissible: true,
        message: 'dismiss me',
      }
    });

    expect(getByText('dismiss me')).toBeInTheDocument();

    const dismissButton = getByRole('button');

    await fireEvent.click(dismissButton);

    expect(dismissToast).toHaveBeenCalled();
  });

});
