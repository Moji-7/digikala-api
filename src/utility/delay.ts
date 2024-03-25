export function delay(
  seconds: number = 1,
  resultStatus: boolean = true,
): Promise<void> {
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
export function pipelines() {
  return {
    pipelines: [
      {
        id: '1',
        eyeProduct: '123',
        lastStatus: 'Active',
        runnedDate: '2023-08-01',
      },
      {
        id: '2',
        eyeProduct: '123',
        lastStatus: 'Pending',
        runnedDate: '2023-08-02',
      },
      {
        id: '3',
        eyeProduct: '123',
        lastStatus: 'Completed',
        runnedDate: '2023-08-03',
      },
    ]
  };
}

