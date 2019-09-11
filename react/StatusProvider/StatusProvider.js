// @flow
import React, { Component } from 'react';

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

class StatusProvider extends Component<Props> {
  static defaultProps = {
    onRetry: undefined,
    extraData: null,
    keepCache: false,
    renderDefault: null,
    renderLoading: null,
    renderSuccess: null,
    renderFailure: null,
    loader: false,
  };

  shouldComponentUpdate(nextProps: Props) {
    const { status, extraData, keepCache } = this.props;

    if (keepCache) {
      if (status === 'success' && nextProps.status === 'loading') {
        return false;
      }
    }

    return (nextProps.status !== status || nextProps.extraData !== extraData);
  }


  _renderContent = () => {
    const {
      status,
      renderDefault,
      renderLoading,
      renderSuccess,
      renderFailure,
      loader,
    } = this.props;

    switch (status) {
      case 'default':
        return renderDefault ? renderDefault() : null;
      case 'loading':
        return renderLoading ? renderLoading() : null;
      case 'success':
        return renderSuccess ? renderSuccess() : null;
      case 'fail':
        return renderFailure ? renderFailure() : null;
      default:
        return null;
    }
  };

  render() {
    return this._renderContent();
  }
}

export default StatusProvider;
