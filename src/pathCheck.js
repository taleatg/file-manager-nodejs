import { join, isAbsolute } from 'path';

export const pathCheck = (path, currentDirectory) => {
  const index = path.indexOf(' ');
  const url = path.slice(index + 1).replace('_', ' ');
  return isAbsolute(url) ? url : join(currentDirectory, url);
}

export const pathChekWithOtherParam = (inputs, currentDirectory) => {
  if (inputs.split(' ').length !== 3) {
    return [];
  }

  const indexStart = inputs.indexOf(' ');
  const indexFinish = inputs.lastIndexOf(' ');
  const url = inputs.slice(indexStart + 1, indexFinish).replace('_', ' ');
  const param = inputs.slice(indexFinish + 1).replace('_', ' ');

  return isAbsolute(url) ? [url, param] : [join(currentDirectory, url), param];
}
