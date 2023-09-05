# Hello world javascript action

This action is to monitor special directory to decide whether files in it have
been changed

## Inputs

### `directories`

**Required** monitored special directories.

### `token`

**Required** github token to get changed file in this commit.

### `ignore`

what type file to be ignore.

### `separator`

directory or file separator.

## Outputs

### `matrix`

changed directories which you monitored .

## Example usage

```yaml
uses: mingrenliu/dir-monitor@v1
with:
  directories: 'ConfigurationCenter;ExcelUtils'
  token: '${{github.token}}'
  ignore: '**.md'
```
