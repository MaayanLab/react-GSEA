import json
from setuptools import setup, find_packages

packageJson = json.load(open('package.json', 'r'))

setup(
  name='react_gsea',
  version=packageJson['version'],
  description=packageJson['description'],
  # url=packageJson['homepage'],
  # author=packageJson['author'],
  license=packageJson['license'],
  long_description=open('README.md', 'r').read(),
  packages=find_packages(),
  include_package_data=True,
  package_data={'react_gsea': [
    'package-info.json',
    'react_gsea.min.js',
  ]},
  install_requires=list(map(str.strip, open('requirements.txt', 'r').readlines())),
)
