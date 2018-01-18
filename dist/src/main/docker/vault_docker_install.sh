#!/bin/bash
#set -x

# =========================================================================
# Copyright 2017 T-Mobile USA, Inc.
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# =========================================================================

cd /tmp

#TVAULT_TAR_NAME=vault.tar.gz

#if [ -f "vault.tar.gz" ]; then
#   tar -xvf $TVAULT_TAR_NAME
#fi

if [ -f "vault.sh" ]; then
   chmod +x vault.sh
fi

if [ -f "parameter" ]; then
   chmod +x parameter
fi

./vault.sh -s silent
