## StatusProvider

* 📄 index.js
* 📄 StatusProvider.js

---

### DOC

```javascript
type Props = {
  status: 'default' | 'loading' | 'success' | 'fail' | 'offline',
  extraData?: any,
  keepCache?: boolean,
  renderDefault?: ?() => any,
  renderLoading?: ?() => any,
  renderSuccess?: ?() => any,
  renderFailure?: ?() => any,
  onRetry?: () => void | null,
  loader?: boolean,
};
```