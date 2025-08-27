import IMask from 'imask';

export const applyPhoneMask = (element) => {
  return IMask(element, {
    mask: '(00) 00000-0000'
  });
};

export const applyCEPMask = (element) => {
  return IMask(element, {
    mask: '00000-000'
  });
};

export const removeMask = (value) => {
  return value.replace(/\D/g, '');
};