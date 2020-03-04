## ApiExecutor

* 📄 index.js
* 📄 ApiExecutor.js

---

### DOC

```javascript
type ApiExecutorType = {
  get: (url: string, query?: Object, config?: Object) => Promise<any>,
  put: (url: string, body?: any) => Promise<any>,
  del: (url: string) => Promise<any>,
  post: (url: string, body?: Object | string, config?: Object) => Promise<any>,
  upload: (url: string, body?: Object) => Promise<any>,
  setSessionToken: (token?: string) => void,
};
```