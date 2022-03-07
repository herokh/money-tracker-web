import { useCallback, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
  where,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import dayjs from "dayjs";

const useTransaction = () => {
  const [totalBalances, setTotalBalances] = useState(0);
  const [transactionsView, setTransactionsView] = useState([]);
  const [loading, setLoading] = useState(false);
  const updateView = useCallback(() => {
    const NUMBER_OF_RECENT_DAYS = 30;
    fetchTransactions(NUMBER_OF_RECENT_DAYS).then((result) =>
      setTransactionsView(result)
    );

    fetchTotalBalances().then((result) =>
      setTotalBalances(result.totalBalances)
    );
  }, []);

  useEffect(() => {
    updateView();
  }, [updateView]);

  const addNewTransaction = async (model) => {
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "transactions"), model);
      return docRef;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const updateTransaction = async (model) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "transactions", model.id);
      return await updateDoc(docRef, model);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "transactions", transactionId);
      return await deleteDoc(docRef);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const fetchTransactions = async (numberOfRecentDaysFilter) => {
    try {
      const db = getFirestore();
      const ref = collection(db, "transactions");
      let lastTwoMonths;
      if (numberOfRecentDaysFilter) {
        lastTwoMonths = dayjs().add(-numberOfRecentDaysFilter, "day").toDate();
      }

      const q = lastTwoMonths
        ? query(
            ref,
            where("inserted", ">", lastTwoMonths),
            orderBy("inserted", "desc")
          )
        : query(ref, orderBy("inserted", "desc"));
      setLoading(true);
      const snapshot = await getDocs(q);
      const result = snapshot.docs.map((doc) => {
        const data = doc.data();
        const transaction = { ...data, ...{ id: doc.id } };
        return transaction;
      });
      setLoading(false);
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const fetchTotalBalances = async () => {
    try {
      setLoading(true);
      const db = getFirestore();
      const ref = doc(db, "settings", "TOTAL_BALANCES");
      const snapshot = await getDoc(ref);
      setLoading(false);
      return snapshot.data();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const updateTotalBalances = async () => {
    try {
      const totalBalances = await calculateTotalBalances();
      const db = getFirestore();
      const docRef = await setDoc(doc(db, "settings", "TOTAL_BALANCES"), {
        totalBalances,
      });
      return docRef;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const calculateTotalBalances = async () => {
    const result = await fetchTransactions(null);
    const totalBalances = result.reduce((initialValue, transaction) => {
      const totalValue = initialValue + +transaction.amount;
      return totalValue;
    }, 0);

    setTotalBalances(totalBalances);
    return totalBalances;
  };

  return [
    transactionsView,
    totalBalances,
    loading,
    updateView,
    updateTotalBalances,
    addNewTransaction,
    updateTransaction,
    deleteTransaction,
  ];
};

export default useTransaction;
