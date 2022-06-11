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

export const pathChekWithFileName = (inputs, currentDirectory) => {
  if (inputs.split(' ').length !== 3) {
    return [];
  }

  const indexStartName = inputs.indexOf(' ');
  const indexFinishName = inputs.lastIndexOf(' ');

  let pathToFile = inputs.slice(indexStartName + 1, indexFinishName).replace('_', ' ');
  let pathToDestination = inputs.slice(indexFinishName + 1).replace('_', ' ');

  pathToFile = isAbsolute(pathToFile) ? pathToFile : join(currentDirectory, pathToFile);
  pathToDestination = isAbsolute(pathToDestination) ? pathToDestination : join(currentDirectory, pathToDestination);

  return [pathToFile, pathToDestination];
}
