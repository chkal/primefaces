/*
 * Copyright 2009 Prime Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.primefaces.model;

import java.util.List;

public interface TreeNode {

	public String getType();

	public Object getData();

	public List<TreeNode> getChildren();

	public TreeNode getParent();

	public void setParent(TreeNode treeNode);

	public boolean isExpanded();

	public void setExpanded(boolean expanded);

	public void addChild(TreeNode treeNode);

	public int getChildCount();

	public boolean isLeaf();
}