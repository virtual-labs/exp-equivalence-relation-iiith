### Equivalence Relation

Equivalence relation defined on a set in mathematics is a binary relation that is reflexive, symmetric, and transitive. A binary relation over the sets $ A $ and $ B $ is a subset of the cartesian product $ A \times B $ consisting of elements of the form $ (a, b) $ such that $ a \in A $ and $ b \in B $. A very common and easy-to-understand example of an equivalence relation is the 'equal to $ (=) $' relation which is reflexive, symmetric and transitive.

As the name suggests, two elements of a set are said to be equivalent if and only if they belong to the same equivalence class. In this article, we will understand the concept of equivalence relation, class, partition with proofs and solved examples.

#### What is Equivalence Relation?

An equivalence relation is a binary relation defined on a set $ X $ such that the relation is reflexive, symmetric and transitive. If any of the three conditions (reflexive, symmetric and transitive) does not hold, the relation cannot be an equivalence relation. The equivalence relation divides the set into disjoint equivalence classes. Any two elements of the set are said to be equivalent if and only if they belong to the same equivalence class. An equivalence relation is generally denoted by the symbol $ \sim $.

#### Equivalence Relation Definition

A relation in mathematics for real numbers $ \mathbb{R} $ defined on a set $ A $ is said to be an equivalence relation if and only if it is reflexive, symmetric and transitive. They are often used to group together objects that are similar, or equivalent. It satisfies the following conditions for all elements $ a, b, c \in A $:
-  Reflexive - $ R $ is reflexive if $ (a, a) \in R $ $ \forall a \in A $
-  Symmetric - $ R $ is symmetric if and only if $ (a, b) \in R \implies (b, a) \in R $ $ \forall a, b \in A $
-  Transitive - $ R $ is transitive if and only if $ (a, b) \in R $ and $ (b, c) \in R \implies (a, c) \in R $ for all $ a, b, c \in A $

The equivalence relation involves three types of relations such as reflexive relation, symmetric relation, transitive relation.

#### Examples of Equivalence Relation

- 'Is equal to $ (=) $' is an equivalence relation on any set of numbers $ A $ as for all elements $ a, b, c \in A $,
     we have $ a = a $, $ a = b \implies b = a $, and $ a = b $, $ b = c \implies a = c $. This implies $ (=) $ is reflexive, symmetric and transitive.

- 'Is similar to $ (\sim) $' defined on the set of triangles: It is reflexive, symmetric, and transitive.
- 'Has the same birthday' defined on the set of people: It is reflexive, symmetric, and transitive.
- 'Is congruent to' defined on the set of triangles is an equivalence relation as it is reflexive, symmetric, and transitive.
- 'Congruence modulo $ n $ $ (\equiv) $' defined on the set of integers: It is reflexive, symmetric, and transitive.
- 'Has the same absolute value' defined on the set of real numbers is an equivalence relation as it is reflexive, symmetric, and transitive.

#### Proof of Equivalence Relation

To understand how to prove if a relation is an equivalence relation, let us consider an example. Define a relation $ R $ on the set of natural numbers $ \mathbb{N} $ as $ (a, b) \in R $ if and only if $ a = b $. Now, we will show that the relation $ R $ is reflexive, symmetric and transitive.

- Reflexive Property - Since every natural number is equal to itself, that is, $ a = a $ $ \forall a \in \mathbb{N} \implies (a, a) \in R $ $ \forall a \in \mathbb{N} $. Hence, $ R $ is reflexive.
- Symmetric Property - For $ a, b \in \mathbb{N} $, let $ (a, b) \in R \implies a = b \implies b = a \implies (b, a) \in R $. Since $ a, b $ are arbitrary, $ R $ is symmetric.
- Transitive Property - For $ a, b, c \in \mathbb{N} $, let $ (a, b) \in R $ and $ (b, c) \in R \implies a = b $ and $ b = c \implies a = c $ (as numbers equal to the same number are equal to one another) $ \implies (a, c) \in R $. Since $ a, b, c $ are arbitrary, $ R $ is transitive.

Since $ R $, defined on the set of natural numbers $ \mathbb{N} $, is reflexive, symmetric, and transitive, $ R $ is an equivalence relation.

#### Proving a Relation is Not an Equivalence Relation

We have seen how to prove an equivalence relation. Now, we will consider an example of a relation that is not an equivalence relation and find a counterexample for the same. Define a relation $ R $ on the set of integers as $ (a, b) \in R \iff a \geq b $. We will check for the three conditions (reflexivity, symmetricity, transitivity):

- Reflexivity - As every integer is equal to itself, that is, $ a = a $ $ \forall a \in \mathbb{Z} $, it satisfies $ a \geq a $ $ \forall a \in \mathbb{Z} $. This implies $ (a, a) \in R $ $ \forall a \in \mathbb{Z} $. Hence, $ R $ is reflexive.

- Symmetricity - For $ a, b \in \mathbb{Z} $, let $ (a, b) \in R \implies a \geq b $. This does not imply that $ b \geq a $. For example, $ 12 \geq 9 $ but $ 9 \not\geq 12 $. This implies $ R $ is not symmetric.

We do not need to check for transitivity as $ R $ is not symmetric $ \implies R $ is not an equivalence relation.

#### Definitions Related to Equivalence Relation

Now, we will understand the meaning of some terms related to equivalence relation such as equivalence class, partition, quotient set, etc. Consider an equivalence relation $ R $ defined on set $ A $ with $ a, b \in A $.

- Equivalence Class - An equivalence class is a subset $ B $ of $ A $ such that $ (a, b) \in R $ $ \forall a, b \in B $ and $ a, b $ cannot be outside of $ B $. Mathematically, an equivalence class of $ a $ is denoted as $ [a] = \{x \in A: (a, x) \in R\} $ which contains all elements of $ A $ which are related to $ a $. All elements of $ A $ equivalent to each other belong to the same equivalence class. In other words, all elements belonging to the same equivalence class are equivalent to each other.

- Partition - A partition of set $ A $ is a non-empty set of disjoint subsets of $ A $ such that no element of $ A $ is in two subsets of $ A $ and elements belonging to the same subset are related to each other. The union of subsets in the partition is equal to set $ A $.

- Quotient Set - A quotient set is a set of all equivalence classes of an equivalence relation denoted by $ A/R = \{[a]: a \in A\} $

### Example

<details>
<summary>

> #### Consider $ A = \{2, 3, 4, 5\} $ and $ R = \{(5, 5), (5, 3), (2, 2), (2, 4), (3, 5), (3, 3), (4, 2), (4, 4)\} $. Is Relation $ R $ Reflexive, Symmetric, Transitive and Equivalent?
</summary>

> ##### Relation $ R $ is reflexive because $ (5, 5), (2, 2), (3, 3) $ and $ (4, 4) \in R $
> ##### Relation $ R $ is symmetric as whenever $ (a, b) \in R $, $ (b, a) $ also relates to $ R $. $ (2, 4) \in R \implies (4, 2) \in R $
> ##### Relation $ R $ is transitive as whenever $ (a, b) $ and $ (b, c) $ relate to $ R $, $ (a, c) $ also relates to $ R $. Example: $ (3, 5) \in R $ and $ (5, 3) \in R \implies (3, 3) \in R $.
> ##### $ R $ is reflexive, symmetric and transitive. So, $ R $ is an Equivalence Relation
</details>

<details><summary> 

> #### Is Relation $ R $ in $ \mathbb{R} $ defined as $ R = \{(a,b): a < b\} $ Equivalent or not?

</summary>

> ##### $ (a,a): a \leq a $ is true $ \forall a \in \mathbb{R} $ hence reflexive
> ##### $ (a,b) \implies a \leq b $, $ (b,c) \implies b \leq c \implies a \leq c = (a,c) \in R $ hence $ R $ is transitive.
> ##### $ (a,b) \implies a \leq b $, $ (b,a) \in R $ hence $ R $ is not symmetric. Example: $ (1,3) \implies 1 \leq 3 $ but $ (3,1) $: $ 3 $ is not $ \leq 1 $
> ##### Relation $ R $ is reflexive, transitive but not symmetric, therefore it is not equivalent.

</details>