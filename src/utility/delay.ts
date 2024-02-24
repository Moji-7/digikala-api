
export function delay(seconds: number = 1, resultStatus: boolean = true): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (resultStatus) {
          resolve();
        } else {
          reject(new Error('Promise rejected'));
        }
      }, seconds * 1000);
    });
  }
  